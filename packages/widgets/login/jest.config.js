const path = require('path')

const base = require('../../../build/jest.config.base.js')

const packageName = path.basename(__dirname)

module.exports = {
  rootDir: '../../..',
  ...base,
  name: packageName,
  displayName: packageName,
  testMatch: [`<rootDir>/packages/widgets/${packageName}/src/**/*.spec.{js,jsx}`],
  collectCoverageFrom: [
    `<rootDir>/packages/widgets/${packageName}/src/**/*.js`,
    `!<rootDir>/packages/widgets/${packageName}/src/main.js`
  ],
  coverageReporters: ['json', 'lcov']
}
