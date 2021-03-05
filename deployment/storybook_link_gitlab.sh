#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails

BOT_COMMENTS_COUNT=$(curl https://api.github.com/repos/${CI_EXTERNAL_PULL_REQUEST_SOURCE_REPOSITORY}/issues/${CI_EXTERNAL_PULL_REQUEST_IID}/comments | jq -e '[.[] | select(.user.login | contains("ToccoBot"))] | length')

if [ $BOT_COMMENTS_COUNT -lt 1 ]; then
  echo "Commenting storybook url to pull request"
  BRANCH_NAME="${CI_EXTERNAL_PULL_REQUEST_SOURCE_BRANCH_NAME//\//_}"

  curl -H "Authorization: token ${GITHUB_BOT_TOKEN}" -X POST \
  -d "{\"body\": \"https://tocco.github.io/tocco-client/${BRANCH_NAME}\"}" \
  "https://api.github.com/repos/${CI_EXTERNAL_PULL_REQUEST_SOURCE_REPOSITORY}/issues/${CI_EXTERNAL_PULL_REQUEST_IID}/comments"
else
  echo "already commented"
fi
