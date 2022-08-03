const {resetDatabase} = require('./database')
const {consoleLog, consoleError} = require('./log')
const {addEntity, addEntityBrowserWidget, addLoginWidget} = require('./rest')

const renameKeys = o =>
  Object.keys(o || {}).reduce((acc, key) => Object.assign({}, acc, {[key.replace(/^CYPRESS_/, '')]: o[key]}), {})

const getEnvs = () => {
  const envs = {
    HIBERNATE_MAIN_SERVERNAME: process.env.HIBERNATE_MAIN_SERVERNAME,
    HIBERNATE_MAIN_DATABASENAME: process.env.HIBERNATE_MAIN_DATABASENAME,
    HIBERNATE_MAIN_USER: process.env.HIBERNATE_MAIN_USER,
    HIBERNATE_MAIN_PASSWORD: process.env.HIBERNATE_MAIN_PASSWORD,
    POSTGRES_USER: process.env.POSTGRES_USER
  }
  return Object.keys(envs).reduce(
    (acc, key) => ({...acc, ...(typeof envs[key] !== 'undefined' ? {[key]: envs[key]} : {})}),
    {}
  )
}

module.exports = (on, config) => {
  const envs = require('dotenv').config()
  config.env = Object.assign({}, renameKeys(envs.parsed), config.env, getEnvs())

  on('task', {
    log: consoleLog,
    'log:error': consoleError,
    'db:empty': () => resetDatabase(config),
    'db:seed:admin': async () => {
      const data = {
        relEvent_language: {key: '3'},
        change_appointment: true,
        minimal_presence: 80,
        relEvent_overbooking: {key: '2'},
        approval_compulsory: false,
        relCost_delimitation_type: {key: '1'},
        relStint_auction_status: {key: '1'},
        relEvent_status: {key: '3'},
        relRegistration_propagation_status: {key: '1'},
        relLecturer_booking_propagation_status: {key: '1'},
        presence_total_relevance: true,
        label: 'test',
        participation_max: 1
      }

      const {pk} = await addEntity(config, 'Event', {
        model: 'Event',
        key: null,
        paths: data
      })

      return {pk, ...data}
    },
    'db:seed:user': async () => {
      const data = {
        firstname: 'Hans',
        lastname: 'Müller',
        relGender: {key: '2'}
      }

      const {pk} = await addEntity(config, 'User', {
        model: 'User',
        key: null,
        paths: data
      })

      return {pk, ...data}
    },
    'db:seed:entity-browser': async () => {
      const {pk} = await addEntityBrowserWidget(config, 'Entity-Browser')

      return {pk, label: 'Entity-Browser'}
    },
    'db:seed:login': async () => {
      const {pk} = await addLoginWidget(config, 'Login')

      return {pk, label: 'Login'}
    }
  })

  return config
}
