
#!/bin/bash
set -e

function loadEnvs() {
  export $(cat ./.nice2.env | xargs)
  export $(cat .env | sed 's/#.*//g' | xargs)
}
loadEnvs

BackupFile=./nice2_cypress.psql
PostgresPort=5432

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
    pg_status=$(pg_isready -d ${HIBERNATE_MAIN_DATABASENAME} -h ${HIBERNATE_MAIN_SERVERNAME} -p $PostgresPort -U ${HIBERNATE_MAIN_USER} | grep -o "accepting connections")
    if [ "${pg_status}" = "accepting connections" ]; then
        return 0;
    else
        return 1;
    fi
}

function nice2IsReady() {
    status_code=$(curl --write-out '%{http_code}' --silent --output /dev/null http://localhost:8080/status-tocco)
    if [[ "$status_code" -ne 200 ]] ; then
        return 1;
    else
        return 0;
    fi
}

function emptyDB() {
  echo "drop database '$HIBERNATE_MAIN_DATABASENAME'"

  psql -v ON_ERROR_STOP=1 -h ${HIBERNATE_MAIN_SERVERNAME} -p $PostgresPort <<EOF
    DROP DATABASE IF EXISTS $HIBERNATE_MAIN_DATABASENAME;
EOF

  echo "create database '$HIBERNATE_MAIN_DATABASENAME'"

  psql -v ON_ERROR_STOP=1 -h ${HIBERNATE_MAIN_SERVERNAME} -p $PostgresPort <<EOF
    CREATE DATABASE $HIBERNATE_MAIN_DATABASENAME WITH OWNER $HIBERNATE_MAIN_USER;
EOF

  psql -v ON_ERROR_STOP=1 -h ${HIBERNATE_MAIN_SERVERNAME} -p $PostgresPort -d ${HIBERNATE_MAIN_DATABASENAME} -U $HIBERNATE_MAIN_USER <<EOF
    CREATE EXTENSION IF NOT EXISTS lo;
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOF
}


function setupCypressUser() {
  echo "insert principal '$CYPRESS_USER'"

  psql -v ON_ERROR_STOP=1 -h ${HIBERNATE_MAIN_SERVERNAME} -p $PostgresPort -U ${HIBERNATE_MAIN_USER} -d ${HIBERNATE_MAIN_DATABASENAME} <<EOF
insert into nice_principal(
_nice_version,
_nice_create_timestamp,
_nice_update_timestamp,
_nice_create_user,
_nice_update_user,
username,
unconfirmed_password_dispatch,
password,
new_password,
fk_user, fk_principal_type, fk_principal_status, fk_interface_language, fail_Login_attempts,
fk_two_step_login_status, sso_subject, secret, wrong_password_count,
support_user, force_two_factor_auth, _system_entity)
values(
1,
now(),
now(),
'cypress',
'cypress',
'$CYPRESS_USER',
0,
'$CYPRESS_PRINCIPAL_PASSWORD_HASH',
false,
1, 1, 3, 1, 0,
2, '', '', 0,
false, false, false) ON CONFLICT DO NOTHING;
EOF

  echo "apply all login roles"

  psql -v ON_ERROR_STOP=1 -h ${HIBERNATE_MAIN_SERVERNAME} -p $PostgresPort -U ${HIBERNATE_MAIN_USER} -d ${HIBERNATE_MAIN_DATABASENAME} <<EOF
insert into nice_login_role(
_nice_version,
_nice_create_timestamp,
_nice_update_timestamp,
_nice_create_user,
_nice_update_user,
manual,
fk_role,
fk_principal,
fk_business_unit, initial_identifier, _system_entity)
select
1,
now(),
now(),
'cypress',
'cypress',
true,
pk,
(select pk from nice_principal where username = '$CYPRESS_USER'),
null,
false, false
from nice_role where pk not in (select fk_role from nice_login_role where fk_principal = (select pk from nice_principal where username = '$CYPRESS_USER'));
EOF

  echo "create api key"

  psql -v ON_ERROR_STOP=1 -h ${HIBERNATE_MAIN_SERVERNAME} -p $PostgresPort -U ${HIBERNATE_MAIN_USER} -d ${HIBERNATE_MAIN_DATABASENAME} <<EOF
insert into nice_api_key (label,
key,
session_key,
_nice_version,
_nice_create_timestamp,
_nice_update_timestamp,
_nice_create_user,
_nice_update_user,
_system_entity,
fk_principal) values
('Cypress API Key',
'$CYPRESS_PRINCIPAL_API_KEY_HASH',
uuid_generate_v4(),
1,
now(),
now(),
'cypress',
'cypress',
false,
(select pk from nice_principal where username = '$CYPRESS_USER')) ON CONFLICT DO NOTHING;
EOF
}


function restoreDB() {
  emptyDB

  if [[ -f "$BackupFile" ]]; then
    echo "restore database '$HIBERNATE_MAIN_DATABASENAME' from file '$BackupFile'"
    pg_restore -h ${HIBERNATE_MAIN_SERVERNAME} -p $PostgresPort -U ${HIBERNATE_MAIN_USER} -j 4 --role ${HIBERNATE_MAIN_USER} --no-owner --no-acl -d ${HIBERNATE_MAIN_DATABASENAME} $BackupFile
  fi
}

function createDump() {
  echo "create database dump from '$HIBERNATE_MAIN_DATABASENAME' to file '$BackupFile'"
  pg_dump -h ${HIBERNATE_MAIN_SERVERNAME} -p $PostgresPort -U ${HIBERNATE_MAIN_USER} -d ${HIBERNATE_MAIN_DATABASENAME} -Fc -f $BackupFile
}
