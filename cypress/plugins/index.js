const {addEntity} = require('./rest')

const renameKeys = o =>
  Object.keys(o || {}).reduce((acc, key) => Object.assign({}, acc, {[key.replace(/^CYPRESS_/, '')]: o[key]}), {})

module.exports = (on, config) => {
  const envs = require('dotenv').config()
  config.env = Object.assign({}, renameKeys(envs.parsed), config.env)

  on('task', {
    'db:empty': () => {
      // TODO: @isbo how can we prune the database while nice2 is running?
    },
    'db:seed': async () => {
      await addEntity(config, 'Event', {
        model: 'Event',
        paths: {
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
      })

      return null
    }
  })

  return config
}
