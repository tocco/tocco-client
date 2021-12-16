#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails

# This script will look for commits with a "Cherry-pick: Up" in the commit message on the current branch
# (since the auto-merge/${version} tag) and cherry pick them to the next release branch

function getTagCommitId() {
  # get commit id of tag
  tag_commit=$(git log -1 --format=%H $tag)
  echo "${tag_commit} is commit id of tag ${tag}"

  # check if tag_commit is in release branch
  if [[ $(git branch --contains $tag_commit | grep $branch | wc -l) == 0 ]]; then
    echo "Commit id is not valid because it does not exist in current branch"
    exit 1
  fi
}

function moveTag() {
  # set tag to head of release branch and push tag
  git checkout $branch
  git tag -f $tag
  git push --tags -f origin $tag
  echo "Move tag ${tag} to head of branch ${branch}"
}

function retrieveCommitsToCherryPick() {
  commitsToCherryPick=()
  for commit in $(git rev-list $branch); do
    # stop by last commit because older commits are already checked
    if [[ $commit == $tag_commit ]]; then
      break
    fi

    # check if commit has Cherry-pick: Up in commit message
    if git log -1 --pretty=%b $commit | tr -d " " | grep -qio "Cherry-pick:Up"; then
      echo "$commit has 'Cherry-pick: Up' in commit message"
      commitsToCherryPick+=($commit)
    fi
  done

  # check if something should be cherry picked
  if [[ ${#commitsToCherryPick[@]} == 0 ]]; then
    echo "Nothing to cherry pick"
    moveTag
    exit 0
  fi
}

function removeLastCommitIfEmpty () {
  if [[ $(git rev-parse HEAD^{tree}) == $(git rev-parse HEAD~1^{tree}) ]]; then
    echo "Commit $(git rev-parse HEAD) is removed because it an empty commit"
    git reset --hard HEAD~1
  fi
}

source ./scripts/helpers.sh
setNiceVersion

repo="tocco/tocco-client"
tag="auto-merge/${nice_version}"
branch="nice-releases/${nice_version}"
target_branch=$(head -n 1 target-branch.txt)

source ./scripts/github.sh
setupGithub
# clone and checkout target branch
cd $(mktemp -d)
git clone git@github.com:${repo}.git . --single-branch --branch $target_branch

git config user.email "tocco.github.bot@gmail.com"
git config user.name "ToccoBot"

# checkout source branch
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git fetch origin $branch --tags
git checkout $branch

getTagCommitId
retrieveCommitsToCherryPick

git checkout $target_branch
commit_id_before=$(git rev-parse HEAD)

# iterate and start by the oldest commit
for ((i = ${#commitsToCherryPick[@]} - 1; i >= 0; i--)); do
  echo "Cherry pick ${commitsToCherryPick[$i]}"
  # if a commit is cherry picked but nothing is changed on the target branch --keep-redundant-commits is required
  # that the cherry-picking does not fail. afterwards with the function removeLastCommitIfEmpty this empty commit is removed.
  # for example a commit from the master is manually picked to nice-releases/229 (and Cherry-pick: Up is added).
  # first the commit is picked to nice-releases/30. next the script tries to pick the commit to master but there the
  # change already exists (and the script should not fail).
  git cherry-pick ${commitsToCherryPick[$i]} --keep-redundant-commits
  if [[ -n $(git status -s) ]]; then
    echo "Cherry picking '${commitsToCherryPick[$i]}' failed and must be resolved manually"
    exit 1
  fi
  removeLastCommitIfEmpty
done

commit_id_after=$(git rev-parse HEAD)

if [ $commit_id_before == $commit_id_after ]; then
  echo "Marked commits already picked"
else
  new_branch=cherry-picking/_${target_branch}_auto-$(date +%s%N)
  git checkout -b $new_branch
  git push origin $new_branch
  echo "Push commits"
fi

moveTag

exit 0
