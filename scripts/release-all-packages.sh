#!/bin/bash
set -eu # Exit with nonzero exit code if anything fails

source ./scripts/helpers.sh

# Gather all packages with private is not equal true in package.json
releasePackages=()
for dir in packages/*/ ; do
  if [[ $(json -f "${dir}package.json" private) != true ]]; then
    releasePackages+=("$(cut -d'/' -f2 <<<${dir})")
  fi
done

# Release package by package
for package in "${releasePackages[@]}"
do
	echo "Start releasing package $package"
	source ./scripts/release-package.sh $package --auto
done
