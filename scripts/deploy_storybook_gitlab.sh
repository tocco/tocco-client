#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails
PAGES_BRANCH="gh-pages"

source ./scripts/github.sh
setupGithub

echo "Clone ${PAGES_BRANCH} branch"
cd dist
git clone https://github.com/tocco/tocco-client.git $PAGES_BRANCH --single-branch --branch $PAGES_BRANCH --depth 1

echo "Copy storybook to folder in repo"
BRANCH_FOLDER_NAME="${CI_COMMIT_BRANCH//\//_}"
echo "folder name: ${BRANCH_FOLDER_NAME}"
rm -rf $PAGES_BRANCH/$BRANCH_FOLDER_NAME
mkdir $PAGES_BRANCH/$BRANCH_FOLDER_NAME
mv storybook/* $PAGES_BRANCH/$BRANCH_FOLDER_NAME
cd $PAGES_BRANCH

echo "Commit and push"
git config user.name "Gitlab CI"
git config user.email "tocco.github.bot@gmail.com"

git add -A
rev=$(git rev-parse --short HEAD)
git diff-index --quiet HEAD || git commit -m "rebuild storybook at ${rev}"

git pull --rebase origin $PAGES_BRANCH
git push -q git@github.com:tocco/tocco-client.git HEAD:$PAGES_BRANCH
