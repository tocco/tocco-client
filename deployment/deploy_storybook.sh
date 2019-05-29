#!/bin/bash
set -e # Exit with nonzero exit code if anything fails
PAGES_BRANCH="gh-pages"

if [ "$TRAVIS_PULL_REQUEST" != "false"  ]
then
  echo "This is a pull request. No deploy of showcase app!"
  exit 0
fi

echo "Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc"
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}

echo "open ssl connection"
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ./deployment/deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

echo "Clone ${PAGES_BRANCH} branch"
cd dist
git clone https://github.com/tocco/tocco-client.git $PAGES_BRANCH --single-branch --branch $PAGES_BRANCH --depth 1


echo "Copy storybook to folder in repo"
BRANCH_FOLDER_NAME="${TRAVIS_BRANCH//\//_}"
echo "folder name: ${BRANCH_FOLDER_NAME}"
rm -rf $PAGES_BRANCH/$BRANCH_FOLDER_NAME
mkdir $PAGES_BRANCH/$BRANCH_FOLDER_NAME
mv storybook/* $PAGES_BRANCH/$BRANCH_FOLDER_NAME
cd $PAGES_BRANCH

echo "Commit and push"
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

git add -A
rev=$(git rev-parse --short HEAD)
git diff-index --quiet HEAD || git commit -m "rebuild storybook at ${rev}"

git push -q git@github.com:tocco/tocco-client.git HEAD:$PAGES_BRANCH
