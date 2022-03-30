#!/bin/bash
set -e

source ./scripts/nice2/helpers.sh

function pingNice2() {
  statusCode=$(curl --write-out '%{http_code}' --silent --output /dev/null ${backendUrl}/status-tocco)
  if [[ "$statusCode" -ne 200 ]] ; then
    echo "NOT OK: ${statusCode}"
  else
    echo "OK"
  fi
}


function ping() {
  timeout=1000
  until [ $timeout -le 0 ]; do
    result=$(pingNice2)
    echo "${result}"
    sleep 3
    timeout=$(( timeout - 1 ))
  done

  if [ $timeout -le 0 ]; then
    return 1
  fi
}

echo "ping nice2 at ${backendUrl}"
ping
