#!/bin/bash
package=$1

source ./scripts/helpers.sh
setColors
checkPackage
setGitVars
setCurrentReleaseTag

if [[ -z $(git status -s) ]]
then
  echo "${color_green}Git tree is clean!${color_reset}"
else
  echo "${color_red}Git tree is dirty, please commit changes before running the release script.${color_reset}"
  exit
fi

echo "---------------------"
echo "info latest release tag: ${color_blue}${last_release_tag}${color_reset}"
echo "info latest version: ${color_blue}${last_version}${color_reset}"
echo "release tag: ${color_blue}${release_tag}${color_reset}"
echo -e  "Generated changelog:\n${color_blue}${changelog}${color_reset}"

read -p "question New version: : " new_version

cd packages/${package}
changelog_file="./changelog.md"
tmp_file="./tmp_changelog.md"

if [[ ! -e "${changelog_file}" ]]; then
    touch ${changelog_file}
fi

(echo  -e "${new_version}\n${changelog}\n" && cat "${changelog_file}") > "${tmp_file}" && mv "${tmp_file}" "${changelog_file}"
read -p "${color_green}Edit the changelog and press ENTER to continue${color_reset}"

git commit -m "docs(${package}): changelog ${new_version}" ${changelog_file}
echo "releasing and publishing ${package} with version ${new_version}"
yarn publish --new-version ${new_version}

read -p "Push commits and tags (y/n)?" PUSH
if [ "$PUSH" = "y" ]; then
  git checkout -b releasing/${package}@${new_version}
  git push
  git push --tags
  git checkout ${current_branch}
  echo "${color_green}Commits and tags pushed!${color_reset}"
else
  echo "${color_red}Nothing pushed!${color_reset}"
fi

read -p "Create a npm dist tag ${release_tag} for current version (y/n)?" CREATE_TAG
if [ "$CREATE_TAG" = "y" ]; then
  echo "Trying to execute: npm dist-tag add tocco-${package}@${new_version} ${release_tag}"
  npm dist-tag add tocco-${package}@${new_version} ${release_tag} --registry=https://registry.npmjs.org/
  echo "${color_green}Npm tag created!${color_reset}"
else
  echo "${color_red}No npm tag created!${color_reset}"
fi

echo "${color_green}Done!${color_reset}"
echo "---------------------"
