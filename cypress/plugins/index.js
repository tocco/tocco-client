const renameKeys = o =>
  Object.keys(o || {}).reduce(
    (acc, key) =>
      Object.assign({}, acc, {[key.replace(/^CYPRESS_/, '')]: o[key]})
    , {}
  )

module.exports = (on, config) => {
  const envs = require('dotenv').config()
  config.env = Object.assign({}, renameKeys(envs.parsed), config.env)
  return config
}
