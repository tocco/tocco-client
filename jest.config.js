const base = require('./build/jest.config.base.js')

module.exports = {
  ...base(__dirname),
  collectCoverageFrom: [`<rootDir>/**/src/**/*.js`, `!<rootDir>**/node_modules/**`, `!**/env.js`],
  coverageDirectory: `<rootDir>/coverage/`
}
