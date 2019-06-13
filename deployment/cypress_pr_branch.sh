if [ "$TRAVIS_PULL_REQUEST" != "false" ] ; then
  BRANCH_NAME="${TRAVIS_PULL_REQUEST_BRANCH//\//_}"
  echo ${BRANCH_NAME}
  export CYPRESS_PR_URL=https://tocco.github.io/tocco-client/${BRANCH_NAME}
fi
