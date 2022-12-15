#!/bin/bash
set -e

function loadEnvs() {
  if [[ -f ".env" ]]; then
    export $(cat .env | sed 's/#.*//g' | xargs)
  fi 
}

loadEnvs

backupFile=./scripts/nice2/nice2_dump.psql
postgresPort=5432

databaseServername="${HIBERNATE_MAIN_SERVERNAME:-localhost}"
databaseUser="${HIBERNATE_MAIN_USER:-nice}"
databasePassword="${HIBERNATE_MAIN_PASSWORD:-nice}"
databaseDatabasename="${HIBERNATE_MAIN_DATABASENAME:-test_cypress}"
databaseSslmode="${HIBERNATE_MAIN_SSLMODE:-disable}"
postgresUser="${POSTGRES_USER}"
postgresPassword="${POSTGRES_PASSWORD}"

backendUrl="${BACKEND_URL:-http://localhost:8080}"

function getNice2Folder() {
  currentNiceVersion=$(cat ./nice-current-version.txt)
  propertiesNiceVersion=$(echo "$currentNiceVersion" | sed -e 's/\.0\s*$//g')

  for folder in $NICE2_REPO_BASE_PATH/*
  do
    propertiesFile="$folder/boot/src/main/resources/ch/tocco/nice2/boot/impl/default.properties"
    if [[ -f "$propertiesFile" ]]; then
      properties=$(cat $propertiesFile)
      if [[ "$properties" == *"$propertiesNiceVersion"* ]]; then
        nice2Folder="$folder"
        break
      fi
    fi
  done

  echo "$nice2Folder"
}

function waitFor() {
  timeout=1000
  until [ $timeout -le 0 ] || ("$@" &> /dev/null); do
    echo waiting for "$@"
    sleep 10
    timeout=$(( timeout - 1 ))
  done
  if [ $timeout -le 0 ]; then
    return 1
  fi
}

function postgresIsReady() {
  pgStatus=$(pg_isready -d ${databaseDatabasename} -h ${databaseServername} -p $postgresPort -U ${databaseUser} | grep -o "accepting connections")
  if [ "${pgStatus}" = "accepting connections" ]; then
    return 0;
  else
    return 1;
  fi
}

function nice2IsReady() {
  statusCode=$(curl --write-out '%{http_code}' --silent --output /dev/null ${backendUrl}/status-tocco)
  if [[ "$statusCode" -ne 200 ]] ; then
    return 1;
  else
    return 0;
  fi
}

function nice2IsConnected() {
  statusCode=$(curl --write-out '%{http_code}' --silent --output /dev/null ${backendUrl}/tocco)
  if [[ "$statusCode" -ne 200 ]] ; then
    return 1;
  else
    return 0;
  fi
}

function waitForNice2() {
  echo "wait for nice2: ${backendUrl}"
  waitFor nice2IsReady
  echo "nice2 is ready"
  waitFor nice2IsConnected
  echo "nice2 is connected"
}

function widgetServerIsReady() {
  statusCode=$(curl --write-out '%{http_code}' --silent --output /dev/null http://localhost:3000)
  if [[ "$statusCode" -ne 200 ]] ; then
    return 1;
  else
    return 0;
  fi
}

function waitForWidgetServer() {
  echo "wait for widget-server: http://localhost:3000"
  waitFor widgetServerIsReady
  echo "widget-server is ready"
}

function createEmptyDB() {
  echo "drop database '$databaseDatabasename'"

  killDatabaseConnections

  args=("-v" "ON_ERROR_STOP=1" "-h" "${databaseServername}" "-p" "$postgresPort")
  if [[ ! -z "${postgresUser}" ]] 
  then 
    args+=("-U")
    args+=("${postgresUser}")
    args+=("-d")
    args+=("postgres")
  fi

  PGPASSWORD=$postgresPassword psql "${args[@]}" <<EOF
    DROP DATABASE IF EXISTS $databaseDatabasename;
EOF

  echo "create user '$databaseUser'"

  PGPASSWORD=$postgresPassword psql "${args[@]}" <<EOF
    DO \$$
    BEGIN
      IF NOT EXISTS (
          SELECT FROM pg_catalog.pg_roles
          WHERE  rolname = '$databaseUser') THEN
        CREATE ROLE $databaseUser WITH SUPERUSER LOGIN PASSWORD '$databasePassword';
      END IF;
    END
    \$$;
EOF

  echo "create database '$databaseDatabasename'"

  PGPASSWORD=$postgresPassword psql "${args[@]}" <<EOF
    CREATE DATABASE $databaseDatabasename WITH OWNER $databaseUser;
EOF

  PGPASSWORD=$databasePassword psql -v ON_ERROR_STOP=1 -h ${databaseServername} -p $postgresPort -d ${databaseDatabasename} -U $databaseUser <<EOF
    CREATE EXTENSION IF NOT EXISTS lo;
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOF
}


function setupCypressUser() {
  echo "insert principal '$CYPRESS_USER'"

  PGPASSWORD=$databasePassword psql -v ON_ERROR_STOP=1 -h ${databaseServername} -p $postgresPort -U ${databaseUser} -d ${databaseDatabasename} <<EOF
BEGIN;

INSERT INTO nice_principal
(
    username,
    password,
    new_password,
    unconfirmed_password_dispatch,
    fail_login_attempts,
    fk_user,
    fk_principal_type,
    fk_principal_status,
    fk_interface_language,
    fk_two_step_login_status,
    _nice_version,
    _nice_create_timestamp,
    _nice_update_timestamp,
    _nice_create_user,
    _nice_update_user,
    sso_subject,
    _system_entity,
    secret,
    wrong_password_count,
    support_user,
    force_two_factor_auth
) VALUES (
    '$CYPRESS_USER',
    '$CYPRESS_USER_PASSWORD_HASH',
    false,
    0,
    0,
    (SELECT min(pk) FROM nice_user),
    (SELECT pk FROM nice_principal_type WHERE unique_id = 'databased'),
    (SELECT pk FROM nice_principal_status WHERE unique_id = 'active'),
    (SELECT pk FROM nice_interface_language WHERE unique_id = 'de'),
    (SELECT pk FROM nice_two_step_login_status WHERE unique_id = 'inactive'),
    1,
    now(),
    now(),
    'tocco',
    'tocco',
    '',
    false,
    '',
    0,
    false,
    false
) ON CONFLICT (username) DO UPDATE
    SET password = '$CYPRESS_USER_PASSWORD_HASH',
    fail_login_attempts = 0,
    fk_principal_status = (SELECT pk FROM nice_principal_status WHERE unique_id = 'active'),
    fk_interface_language = (SELECT pk FROM nice_interface_language WHERE unique_id = 'de');

INSERT INTO nice_login_role (
    _nice_version,
    _nice_create_timestamp,
    _nice_update_timestamp,
    _nice_create_user,
    _nice_update_user,
    fk_principal,
    fk_role,
    fk_business_unit,
    manual,
    initial_identifier,
    _system_entity
) SELECT
    1,
    now(),
    now(),
    'tocco',
    'tocco',
    p.pk,
    r.pk,
    null,
    true,
    '',
    false
  FROM
    nice_role AS r LEFT OUTER JOIN nice_role_type AS rt ON r.fk_role_type = rt.pk,
    nice_principal as p
    WHERE p.username = '$CYPRESS_USER' AND rt.unique_id <> 'guest'
ON CONFLICT DO NOTHING;

INSERT INTO nice_api_key (
    label,
    key,
    session_key,
    _nice_version,
    _nice_create_timestamp,
    _nice_update_timestamp,
    _nice_create_user,
    _nice_update_user,
    _system_entity,
    fk_principal
) VALUES (
    'Cypress API Key',
    '$CYPRESS_USER_API_KEY_HASH',
    uuid_generate_v4(),
    1,
    now(),
    now(),
    'tocco',
    'tocco',
    false,
    (SELECT pk FROM nice_principal WHERE username = '$CYPRESS_USER')
) ON CONFLICT DO NOTHING;

COMMIT;
EOF
}

function doesTemplateExist() {
  args=("-v" "ON_ERROR_STOP=1" "-h" "${databaseServername}" "-p" "$postgresPort")
  if [[ ! -z "${postgresUser}" ]] 
  then 
    args+=("-U")
    args+=("${postgresUser}")
    args+=("-d")
    args+=("postgres")
  fi

  if [ "$( PGPASSWORD=$postgresPassword psql ${args[@]} -XtAc "SELECT 1 FROM pg_database WHERE datname='${databaseDatabasename}_template'" )" = '1' ]
  then
    return
  fi
  false
}

function restoreDB() {
  if doesTemplateExist;
  then
    echo "restore database from template"
    restoreDBFromTemplate
  else
    echo "restore database from file"
    restoreDBFromFile
  fi
}

function restoreDBFromTemplate() {
  args=("-v" "ON_ERROR_STOP=1" "-h" "${databaseServername}" "-p" "$postgresPort")
  if [[ ! -z "${postgresUser}" ]] 
  then 
    args+=("-U")
    args+=("${postgresUser}")
    args+=("-d")
    args+=("postgres")
  fi

  echo "drop database '$databaseDatabasename'"
  PGPASSWORD=$postgresPassword psql "${args[@]}" <<EOF
    DROP DATABASE IF EXISTS $databaseDatabasename;
EOF

  echo "restore '${databaseDatabasename}' from '${databaseDatabasename}_template'"
  PGPASSWORD=$postgresPassword psql "${args[@]}" <<EOF
    CREATE DATABASE $databaseDatabasename WITH OWNER $databaseUser TEMPLATE ${databaseDatabasename}_template;
EOF
}

function restoreDBFromFile() {
  createEmptyDB
  if [[ -f "$backupFile" ]]; then
    echo "restore database '$databaseDatabasename' from file '$backupFile'"
    PGPASSWORD=$databasePassword pg_restore -h ${databaseServername} -p $postgresPort -U ${databaseUser} -j 4 --role ${databaseUser} --no-owner --no-acl -d ${databaseDatabasename} $backupFile
  fi
}

function createDump() {
  echo "create database dump from '$databaseDatabasename' to file '$backupFile'"
  PGPASSWORD=$databasePassword pg_dump -h ${databaseServername} -p $postgresPort -U ${databaseUser} -d ${databaseDatabasename} -Fc -f $backupFile
}

function createTemplate() {
  clearTemplate

  killDatabaseConnections

  echo "create '${databaseDatabasename}_template' from '${databaseDatabasename}'"
  PGPASSWORD=$postgresPassword psql "${args[@]}" <<EOF
    CREATE DATABASE ${databaseDatabasename}_template WITH OWNER $databaseUser TEMPLATE ${databaseDatabasename};
EOF
}

function clearTemplate() {
  echo "drop database '${databaseDatabasename}_template'"

  args=("-v" "ON_ERROR_STOP=1" "-h" "${databaseServername}" "-p" "$postgresPort")
  if [[ ! -z "${postgresUser}" ]] 
  then 
    args+=("-U")
    args+=("${postgresUser}")
    args+=("-d")
    args+=("postgres")
  fi

  PGPASSWORD=$postgresPassword psql "${args[@]}" <<EOF
    DROP DATABASE IF EXISTS ${databaseDatabasename}_template;
EOF
}

function killDatabaseConnections() {
  echo "kill all active db connections to '$databaseDatabasename'"


  args=("-v" "ON_ERROR_STOP=1" "-h" "${databaseServername}" "-p" "$postgresPort")
  if [[ ! -z "${postgresUser}" ]] 
  then 
    args+=("-U")
    args+=("${postgresUser}")
    args+=("-d")
    args+=("postgres")
  fi

  PGPASSWORD=$postgresPassword psql "${args[@]}" <<EOF
    SELECT
      pg_terminate_backend(pg_stat_activity.pid)
    FROM
      pg_stat_activity
    WHERE
      pg_stat_activity.datname = '$databaseDatabasename'
      AND pid <> pg_backend_pid();
EOF
}

function forceRestoreDB() {
  echo "check if nice2 can be reached actually"
  waitForNice2

  killDatabaseConnections
  restoreDB
  echo "restored"

  waitForNice2
}