#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails

echo "CI_EXTERNAL_PULL_REQUEST_TARGET_BRANCH_NAME"
echo $CI_EXTERNAL_PULL_REQUEST_TARGET_BRANCH_NAME

echo "CI_EXTERNAL_PULL_REQUEST_TARGET_BRANCH_SHA"
echo $CI_EXTERNAL_PULL_REQUEST_TARGET_BRANCH_SHA

echo "CI_EXTERNAL_PULL_REQUEST_SOURCE_BRANCH_SHA"
echo $CI_EXTERNAL_PULL_REQUEST_SOURCE_BRANCH_SHA

#TODO check if $CI_EXTERNAL_PULL_REQUEST_TARGET_BRANCH_NAME is a release branch

tempFile=$(mktemp)

for commit in $(git rev-list HEAD); do
  # stop by last commit because older commits are already checked
  if [[ $commit == $CI_EXTERNAL_PULL_REQUEST_TARGET_BRANCH_SHA ]]; then
    break
  fi

  echo "Checking commit message of $commit"

  git log --format=%B -n 1 $commit > $tempFile
  npm exec -- babel-node scripts/msg-validation $tempFile
done

rm ${tempFile}
