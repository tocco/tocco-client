#!/bin/bash

package=$1

source ./scripts/helpers.sh
setColors
checkPackage
setGitVars

echo "---------------------"
echo "info latest release tag: ${color_blue}${last_release_tag}${color_reset}"
echo "info latest version: ${color_blue}${last_version}${color_reset}"
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
echo "${color_green}Published! Now you push!${color_reset}"
echo "---------------------"
