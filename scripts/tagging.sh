#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails

# This script will look for release commits since the last release tag on the current branch and
# then create the missing tags. Thus all releases have tags that dont have to be merged within the according commit.

echo "---Release Tagging Script---"
source ./scripts/github.sh
setupGithub

echo "Cloning branch $CI_COMMIT_BRANCH"
cd "$(mktemp -d)"
git clone git@github.com:tocco/tocco-client.git . --single-branch --branch $CI_COMMIT_BRANCH --depth 500

latest_tag=$(git describe --tags --abbrev=0 --match "*@[0-9]*.[0-9]*.[0-9]*")
echo "Latest tag found on branch: $latest_tag"
matching_commit=$(git log -1 --format=%H $latest_tag)
echo "Matching commit: $matching_commit"

for commit in $(git rev-list $matching_commit..HEAD)
do
    msg="$(git log --format=%s -n 1 $commit)"
    full_msg="$(git log --format=%B -n 2 $commit)"
    isPublish="$(echo $msg | grep -c 'chore: publish')"
    echo "found commit $isPublish: $msg"
    if [ $isPublish == 1 ]; then
        echo "Commit '$msg' ($commit) is a release commit"
        tag_name="$(echo "$full_msg" | grep -e '- ' | sed 's/- //g')"

        echo "Create tag '$tag_name'"
        git tag -f $tag_name $commit

        echo "Push tag '$tag_name'"
        git push --set-upstream git@github.com:tocco/tocco-client.git $tag_name
    fi
done
