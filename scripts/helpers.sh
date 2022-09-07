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
  # 1. get dependency graph of package
  #     --a: all (transitive) dependencies, no depth limit
  #     --silent: ignore unmet dependencies (such as react)
  #     --parseble: return absolute path the node module folder
  # 2. get package name (is the last folder name of the path)
  # 3. only get tocco packages
  # 4. sort packages and remove duplicates
  dev_dependencies=$(npm --prefix packages/${package} ls --a  --silent --parseable | sed 's/.*\///' | grep tocco | sort | uniq)
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
  last_release_tag=$(git describe --tags --match 'tocco-'${package}'@*' --abbrev=0 ${current_branch})
  last_version=$(echo ${last_release_tag} | awk -F '@' '{print $2}')

  greps=$(getDevDependenciesGreps)
  changelog=$(git log --pretty='%b' "${last_release_tag}"..HEAD --grep="${package}" ${greps} --reverse | grep -E '^Changelog:' | awk '{gsub("Changelog:", "-", $0); print}')
}

function checkPackage() {
  if [[ ! "${package}" ]] || [[ ! -d "packages/${package}" ]]; then
     echo "${color_red}Please provide a valid package name${color_reset}"
     exit 1
  fi
}

function setNiceVersion() {
  nice_version=$(head -n 1 nice-current-version.txt | sed -r 's/(\.0$|\.)//g')
}

function setCurrentReleaseTag() {
  setNiceVersion
  release_tag="nice${nice_version}"
}

function setNextVersion() {
  if [[ $remote_branch == "master" ]]; then
    local major="$(cut -d'.' -f1 <<<${last_version})"
    local minor="$(cut -d'.' -f2 <<<${last_version})"
    local patch="$(cut -d'.' -f3 <<<${last_version})"
    next_version="${major}.${minor}.$((patch + 1))"
  else
    if [[ $last_version == *"-hotfix"* ]]; then
      local last_version_number="$(cut -d'-' -f1 <<<${last_version})"
      local fix_number="$(cut -d'.' -f2 <<<"$(cut -d'-' -f2 <<<${last_version})")"
      next_version="${last_version_number}-hotfix${nice_version}.$((fix_number + 1))"
    else
      next_version="${last_version}-hotfix${nice_version}.1"
    fi
  fi
}
