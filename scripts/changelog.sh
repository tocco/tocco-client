#!/bin/bash

package=$1

source ./scripts/helpers.sh
setColors
checkPackage
setGitVars

echo "info latest release tag: ${color_blue}${last_release_tag}${color_reset}"
echo -e  "info changelog:\n${color_blue}${changelog}${color_reset}"
