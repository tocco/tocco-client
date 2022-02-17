#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails

source ./scripts/helpers.sh
setCurrentReleaseTag
rootDir="$(pwd)"

# Gather all packages with private is not equal true in package.json
releasePackages=()
for dir in packages/*/ ; do
  if [[ -f "${dir}package.json" && $(json -f "${dir}package.json" private) != true ]]; then
    package="$(cut -d'/' -f2 <<<${dir})"
    package+="@"
    package+="$(json -f "${dir}package.json" version)"
    releasePackages+=($package)
  fi
done

# Release package by package
for package in "${releasePackages[@]}"
do
	echo "Tagging package $package"
  npm dist-tag add tocco-$package $release_tag
done
