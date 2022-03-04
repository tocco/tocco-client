#!/bin/bash
set -em
echo "run nice2"

export $(cat ./.nice2.env | xargs)

source ./cypress-scripts/helpers.sh

function runNice2() {
  echo "start nice2"
  sh ./gradlew customer:test:bootRun -PmaxHeapSize='4G' --args='--spring.profiles.active=development --spring.output.ansi.enabled=ALWAYS'
}

function runDbRefactoring() {
  echo "run db refactoring"
  sh ./gradlew customer:test:bootRun -PjvmArgs='-Dch.tocco.nice2.disableSchemaModelStartupCheck=true' --args='--spring.profiles.active=development --spring.output.ansi.enabled=ALWAYS --ch.tocco.nice2.enableUpgradeMode=true --ch.tocco.nice2.enterprisesearch.disableStartup=true --ch.tocco.nice2.disableRoleSync=true --ch.tocco.nice2.disableLanguageSync=true --ch.tocco.nice2.disableBusinessUnitSync=true'
}

function initDB () {
  echo "wait for nice2 is ready"
  waitFor nice2IsReady
  echo "nice2 is ready"

  setupCypressUser
}

function nice2() {
  echo "wait for postgres is ready"
  waitFor postgresIsReady
  echo "postgres is ready"

  restoreDB

  cd $(echo $NICE2_REPO | tr -d '\r')

  echo "run nice2 from folder '${NICE2_REPO}'"
  
  runDbRefactoring

  runNice2 & initDB && fg
}

nice2

