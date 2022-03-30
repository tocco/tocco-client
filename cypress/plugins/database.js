/* eslint-disable no-console */
const {/* exec, */ spawn} = require('child_process')

const setEnv = (config, key) => (config.env[key] ? {[key]: config.env[key]} : {})

const resetDatabase = config => {
  const promise = new Promise((resolve, reject) => {
    const env = {
      ...setEnv(config, 'BACKEND_URL'),
      ...setEnv(config, 'HIBERNATE_MAIN_SERVERNAME'),
      ...setEnv(config, 'HIBERNATE_MAIN_DATABASENAME'),
      ...setEnv(config, 'HIBERNATE_MAIN_USER'),
      ...setEnv(config, 'HIBERNATE_MAIN_PASSWORD'),
      ...setEnv(config, 'DATABASE_SUPERUSER')
    }

    const child = spawn('bash', ['./scripts/nice2/db-reset.sh'], {env: {...process.env, ...env}})

    child.stdout.pipe(process.stdout)
    child.stderr.pipe(process.stderr)

    child.on('error', error => {
      console.error(`error: ${error.message}`)
      console.error(error)
      reject(error)
    })

    child.on('close', code => {
      console.log(`db-reset.sh process exited with code ${code}`)
      resolve(code)
    })
  })
  return promise
}

module.exports = {
  resetDatabase
}
