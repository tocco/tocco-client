const base = require('./build/jest.config.base.js')

module.exports = {
  ...base(__dirname),
  collectCoverage: false
}
