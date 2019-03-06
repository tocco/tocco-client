function setColors(){
  color_blue=`tput setaf 4`
  color_green=`tput setaf 2`
  color_red=`tput setaf 1`
  color_reset=`tput sgr0`
}

function setGitVars() {
  current_branch=$(git rev-parse --abbrev-ref HEAD)
  last_release_tag=$(git describe --tags --match 'tocco-'${package}'@*' --abbrev=0 ${current_branch})
  last_version=$(echo ${last_release_tag} | awk -F '@' '{print $2}')
  changelog=$(git log --pretty='%b' "${last_release_tag}"..HEAD --grep="${package}" --reverse | grep -E '^Changelog:' | awk '{gsub("Changelog:", "- ", $0); print}')
}

function checkPackage() {
  if [[ ! "${package}" ]] || [[ ! -d "packages/${package}" ]]; then
     echo "${color_red}Please provide a valid package name${color_reset}"
     exit
  fi
}
