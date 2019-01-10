#!/bin/bash
set -e # Exit with nonzero exit code if anything fails
SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

if [ "$TRAVIS_PULL_REQUEST" != "false"  ]
then
  echo "This is a pull request. No deploy of showcase app!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)
BRANCH_FOLDER_NAME="${TRAVIS_BRANCH//\//_}"
echo ">>> ${BRANCH_FOLDER_NAME}"
mkdir dist/deployment/$BRANCH_FOLDER_NAME
mv dist/storybook dist/deployment/$BRANCH_FOLDER_NAME
cd dist/deployment

git init
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

git remote add upstream "https://github.com/tocco/tocco-client.git"
git fetch upstream
git reset upstream/$TARGET_BRANCH

git add -A .
git commit -m "rebuild pages at ${rev}"

# Get the deploy key by using Travis's stored variables to  decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}

openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ../../../deployment/deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

# Now that we're all set up, we can push.
git push -q git@github.com:tocco/tocco-client.git HEAD:$TARGET_BRANCH
