#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails
echo "$CI_EXTERNAL_PULL_REQUEST_IID"
echo "$CI_EXTERNAL_PULL_REQUEST_SOURCE_REPOSITORY"
if [ "$CI_EXTERNAL_PULL_REQUEST_IID" != "false" ] ; then
  BRANCH_NAME="${CI_EXTERNAL_PULL_REQUEST_IID//\//_}"
  curl -H "Authorization: token ${GITHUB_BOT_TOKEN}" -X POST \
  -d "{\"body\": \"https://tocco.github.io/tocco-client/${BRANCH_NAME}\"}" \
  "https://api.github.com/repos/${CI_EXTERNAL_PULL_REQUEST_SOURCE_REPOSITORY}/issues/${CI_EXTERNAL_PULL_REQUEST_IID}/comments"
fi
