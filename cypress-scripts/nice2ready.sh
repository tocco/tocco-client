#!/bin/bash
set -e

source ./cypress-scripts/helpers.sh


function initDB () {
  echo "wait for nice2 is ready"
  waitFor nice2IsReady
  echo "nice2 is ready"
}

initDB
