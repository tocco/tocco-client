function transformPackageName() {
  name=$1
  if [ $name == "tocco-ui" ] || [ $name == "tocco-util" ] || [ $name == "tocco-theme" ];
  then
      echo "${1}"
  else
      echo "${name//"tocco-"/}"
  fi
}

function getDevDependenciesGreps() {
  dev_dependencies=$(json -f "packages/${package}/package.json" devDependencies | json -ka)
  package_greps=""
  for item in ${dev_dependencies//\\n/}
  do
    transformed_name=$(transformPackageName $item)
    package_greps+=" --grep=${transformed_name}"
  done

  echo "${package_greps}"
}

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

  greps=$(getDevDependenciesGreps)
  changelog=$(git log --pretty='%b' "${last_release_tag}"..HEAD --grep="${package}" ${greps} --reverse | grep -E '^Changelog:' | awk '{gsub("Changelog:", "- ", $0); print}')
}

function checkPackage() {
  if [[ ! "${package}" ]] || [[ ! -d "packages/${package}" ]]; then
     echo "${color_red}Please provide a valid package name${color_reset}"
     exit
  fi
}
