#!/bin/bash
package=$1

# Script should not be called directly as some variables are set by the releases-packages.sh file

source ./scripts/helpers.sh
checkPackage
setGitVars
setNextVersion

if [[ -z "${changelog}" && $auto = true ]]; then
	echo "${color_red}Skip package ${package} because changelog is empty. ${color_reset}"
  return
fi

echo "---------------------"
echo "info latest release tag: ${color_blue}${last_release_tag}${color_reset}"
echo "info latest version: ${color_blue}${last_version}${color_reset}"
echo "release tag: ${color_blue}${release_tag}${color_reset}"
echo -e  "Generated changelog:\n${color_blue}${changelog}${color_reset}"

if [[ $auto = false ]]; then
  read -p "New version [default value if empty: ${next_version}] : " new_version
else
  new_version=''
fi

if [[ -z "${new_version}" ]]; then
	new_version="${next_version}"
	echo "New version is ${new_version}"
fi

cd packages/${package}
changelog_file="./changelog.md"
tmp_file="./tmp_changelog.md"

if [[ ! -e "${changelog_file}" ]]; then
    touch ${changelog_file}
fi

(echo  -e "${new_version}\n${changelog}\n" && cat "${changelog_file}") > "${tmp_file}" && mv "${tmp_file}" "${changelog_file}"

if [[ $auto = true ]]; then
  echo "Skip editing changelog"
else
  read -p "${color_green}Edit the changelog and press ENTER to continue${color_reset}"
fi

git commit --no-verify -m "docs(${package}): changelog ${new_version}" ${changelog_file}
echo "releasing and publishing ${package} with version ${new_version}"
yarn publish --no-commit-hooks --new-version ${new_version}
exitCode="$?"
if [ $exitCode != 0 ]; then
  echo "yarn publish exited with code $exitCode (error)"
  exit 1
fi
git tag --delete _tocco-${package}@${new_version}

if [[ $auto = true ]]; then
  CREATE_TAG="y"
else
  read -p "Create a npm dist tag ${release_tag} for current version (y/n)?" CREATE_TAG
fi

if [ "$CREATE_TAG" = "y" ] || [ "$CREATE_TAG" = "Y" ]; then
  echo "Trying to execute: npm dist-tag add tocco-${package}@${new_version} ${release_tag}"
  npm dist-tag add tocco-${package}@${new_version} ${release_tag} --registry=https://registry.npmjs.org/
  echo "${color_green}Npm tag created!${color_reset}"
else
  echo "${color_red}No npm tag created!${color_reset}"
fi

echo "${color_green}Done!${color_reset}"
echo "---------------------"
