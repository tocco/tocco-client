#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails

PAGES_BRANCH="master"
REPO_NAME="tocco-storybook"

source ./scripts/git.sh
setupGitlab

cd dist

echo "Clone ${REPO_NAME}"
git clone git@gitlab.com:toccoag/tocco-storybook.git --single-branch --branch $PAGES_BRANCH --depth 1

echo "Copy storybook pages to ${REPO_NAME}"
BRANCH_FOLDER_NAME="${CI_COMMIT_BRANCH//\//_}"
echo "folder name: ${BRANCH_FOLDER_NAME}"
rm -rf $REPO_NAME/$BRANCH_FOLDER_NAME
mkdir $REPO_NAME/$BRANCH_FOLDER_NAME
mv storybook/* $REPO_NAME/$BRANCH_FOLDER_NAME
cd $REPO_NAME

echo "Commit and push"
setupGitlabUser

git add -A
rev=$(git rev-parse --short HEAD)
git diff-index --quiet HEAD || git commit -m "rebuild storybook at ${rev}"

git pull --rebase origin $PAGES_BRANCH
git push -q git@gitlab.com:toccoag/tocco-storybook.git HEAD:$PAGES_BRANCH
