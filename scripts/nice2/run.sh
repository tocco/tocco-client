#!/bin/bash
set -em
echo "run nice2"

source ./scripts/nice2/helpers.sh

currentPwd=$(pwd)

function setupEnvs() {
  export HIBERNATE_MAIN_SERVERNAME=$databaseServername
  export HIBERNATE_MAIN_USER=$databaseUser
  export HIBERNATE_MAIN_PASSWORD=$databasePassword
  export HIBERNATE_MAIN_DATABASENAME=$databaseDatabasename
  export HIBERNATE_MAIN_SSLMODE=$databaseSslmode
}

function runNice2() {
  echo "start nice2"
  sh ./gradlew customer:test:bootRun -PmaxHeapSize='4G' --args='--spring.profiles.active=development --spring.output.ansi.enabled=ALWAYS'
}

function runDbRefactoring() {
  echo "run db refactoring"
  sh ./gradlew customer:test:bootRun -PjvmArgs='-Dch.tocco.nice2.disableSchemaModelStartupCheck=true' --args='--spring.profiles.active=development --spring.output.ansi.enabled=ALWAYS --ch.tocco.nice2.enableUpgradeMode=true --ch.tocco.nice2.enterprisesearch.disableStartup=true --ch.tocco.nice2.disableRoleSync=true --ch.tocco.nice2.disableLanguageSync=true --ch.tocco.nice2.disableBusinessUnitSync=true'
}

function initDB () {
  previousPwd=$(echo $currentPwd)
  cd $(echo $currentPwd)

  setupCypressUser

  createTemplate
}

function start() {
  echo "wait for postgres is ready"
  waitFor postgresIsReady
  echo "postgres is ready"

  restoreDB

  nice2Repo=$(getNice2Folder)
  echo "run nice2 from folder '${nice2Repo}'"

  setupEnvs

  cd $(echo $nice2Repo | tr -d '\r')
  runDbRefactoring

  initDB

  cd $(echo $nice2Repo | tr -d '\r')
  runNice2 && fg
}

start
