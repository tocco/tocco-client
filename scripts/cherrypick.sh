#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails

# This script will look for commits with a "Cherry-pick: Up" in the commit message on the current branch
# (since the auto-merge/${version} tag) and cherry pick them to the next release branch

function getTagCommitId() {
  # get commit id of tag
  tag_commit=$(git log -1 --format=%H $latest_tag)
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

source ./scripts/helpers.sh
setNiceVersion

repo="tocco/tocco-client"
tag="auto-merge/${nice_version}"
branch="nice-releases/${nice_version}"
target_branch=$(head -n 1 target-branch.txt)

source ./scripts/github.sh
setupGithub
# clone and checkout target branch
git clone git@github.com:${repo}.git ../github --single-branch --branch $target_branch
cd ../github

git config user.email "tocco.github.bot@gmail.com"
git config user.name "ToccoBot"

# checkout source branch
git config remote.origin.fetch "+refs/heads/*:refs/remotes/origin/*"
git fetch origin $branch
git checkout $branch

getTagCommitId
retrieveCommitsToCherryPick

git checkout $target_branch

# iterate and start by the oldest commit
for ((i = ${#commitsToCherryPick[@]} - 1; i >= 0; i--)); do
  echo "Cherry pick ${commitsToCherryPick[$i]}"
  git cherry-pick ${commitsToCherryPick[$i]}
  if [[ -n $(git status -s) ]]; then
    echo "Cherry picking '${commitsToCherryPick[$i]}' failed and must be resolved manually"
    exit 1
  fi
done

if [[ $target_branch != "master" ]]; then
  # release a hotfix if target branch is a release branch
  echo "@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=${FONTAWESOME_NPM_AUTH_TOKEN}
//registry.npmjs.org/:_authToken=${NPMJS_AUTH_TOKEN}" >> ~/.npmrc
  # use env variable FULL_CALENDAR_LICENCE
  yarn release-all-packages
fi

git checkout -b releasing/auto-$(date +%s%N)

# push cherry picked commits
current_branch=$(git branch --show-current)
git push origin $current_branch
git push --tags

# create github PR
pr=$(curl -s -H "Authorization: token ${GITHUB_BOT_TOKEN}" -X POST \
  -d "{\"title\": \"Auto merge ${current_branch} to ${target_branch}\", \"body\": \"\", \"head\": \"${current_branch}\", \"base\": \"${target_branch}\"}" \
  "https://api.github.com/repos/${repo}/pulls" | jq ".url" -r -e)
echo "Pr created: ${pr}"

moveTag

exit 0
