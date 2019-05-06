if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
  BRANCH_NAME="${TRAVIS_PULL_REQUEST_BRANCH//\//_}"
  curl -H "Authorization: token ${GITHUB_BOT_TOKEN}" -X POST \
  -d "{\"body\": \"https://tocco.github.io/tocco-client/${BRANCH_NAME}\"}" \
  "https://api.github.com/repos/${TRAVIS_REPO_SLUG}/issues/${TRAVIS_PULL_REQUEST}/comments"
fi
