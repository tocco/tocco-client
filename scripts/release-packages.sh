#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails

# arguments
# comma-separated list of packages (e.g. admin,entity-browser)
# --all: release all packages (don't pass a comma-separated list of packages)
# --auto: disable questions and use default values

source ./scripts/helpers.sh
setColors
setNiceVersion
setCurrentReleaseTag

rootDir="$(pwd)"
commit_id_before=$(git rev-parse HEAD)

current_branch=$(git rev-parse --abbrev-ref HEAD)
remote_branch=$(git rev-parse --abbrev-ref --symbolic-full-name @{u} | cut -d '/' -f2-)
if [[ $remote_branch != "master" && $remote_branch != nice-releases/* ]]; then
  echo "Running release script is not allowed if remote branch is not master or nice-releases/*"
  exit 1
fi

if [[ $* == *--auto* ]]; then
  auto=true
  echo "Questions are disabled and automatically with default values answered"
else
  auto=false
fi

# check if git tree is clean
if [[ -z $(git status -s) ]]
then
  echo "${color_green}Git tree is clean!${color_reset}"
else
  echo "${color_red}Git tree is dirty, please commit changes before running the release script.${color_reset}"
  git status -s
  exit 1
fi

# Gather all packages with private is not equal true in package.json
allReleasePackages=()
for dir in packages/*/ ; do
  if [[ -f "${dir}package.json" && $(json -f "${dir}package.json" private) != true ]]; then
    allReleasePackages+=("$(cut -d'/' -f2 <<<${dir})")
  fi
done

# Gather packages which should be released
releasePackages=()
if [[ $* == *--all* ]]; then
  # if --all is passed as argument all packages should be released
  releasePackages=("${allReleasePackages[@]}")
else
  # else a comma-separated list of packages (e.g. admin,entity-browser) can be passed
  IFS=',' read -ra input_array <<< "$1"
  for i in "${input_array[@]}"
  do
    # check if package name is valid
    package=$i
    checkPackage

    releasePackages+=("$i")
  done
fi

targetBranch=releasing/_${current_branch}_auto-$(date +%s%N)
echo "Checkin out new branch ${targetBranch}"
git checkout -b ${targetBranch}

# Release package by package
for package in "${releasePackages[@]}";
do
	echo "Start releasing package $package"
	cd $rootDir
  source ./scripts/release-package.sh $package
done

commit_id_after=$(git rev-parse HEAD)

if [ $commit_id_before == $commit_id_after ]; then
  echo "Nothing was released"
  echo "Checkin out ${current_branch}"
  git checkout ${current_branch}
  echo "Delete branch ${targetBranch}"
  git branch -d ${targetBranch}
  exit 0
fi

# squash publish and docs commits to a single commit
commit_body=$(git log --format='%b' --grep 'chore: publish' $commit_id_before..HEAD | awk NF)
git reset --soft $commit_id_before
git commit --no-verify -a -m "$(echo -e "chore: release packages\n\n$commit_body")"

if [[ $auto = true ]]; then
  PUSH="n"
  echo "Pushing commits is skipped"
else
  read -p "Push commits (y/n)?" PUSH
fi

if [ "$PUSH" = "y" ] || [ "$PUSH" = "Y" ]; then
  git push --set-upstream git@github.com:tocco/tocco-client.git ${targetBranch}
  echo "${color_green}Commits pushed to ${targetBranch}!${color_reset}"
else
  echo "${color_red}Nothing pushed!${color_reset}"
fi
