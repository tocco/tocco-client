#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails

source ./scripts/helpers.sh
setNiceVersion

repo="tocco/tocco-client"
branch="nice-releases/${nice_version}"

source ./scripts/github.sh
setupGithub
cd $(mktemp -d)
git clone git@github.com:${repo}.git . --single-branch --branch $CI_COMMIT_BRANCH
setupGitUser

commit_id_before=$(git rev-parse HEAD)

echo "@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=${FONTAWESOME_NPM_AUTH_TOKEN}
//registry.npmjs.org/:_authToken=${NPMJS_AUTH_TOKEN}" >> ~/.npmrc
# use env variable FULL_CALENDAR_LICENCE
yarn release-all-packages

commit_id_after=$(git rev-parse HEAD)

if [ $commit_id_before == $commit_id_after ]; then
  echo "Nothing was released"
else
    new_branch=releasing/_${CI_COMMIT_BRANCH}_auto-$(date +%s%N)
    git checkout -b $new_branch
    git push origin $new_branch
    echo "Push commits"
fi
