const path = require('path')

const base = require('../../../build/jest.config.base.js')

const packageName = path.basename(__dirname)

module.exports = {
  rootDir: '../../..',
  ...base,
  name: packageName,
  displayName: packageName,
  testMatch: [`<rootDir>/packages/actions/${packageName}/src/**/*.spec.{js,jsx}`],
  collectCoverageFrom: [
    `<rootDir>/packages/actions/${packageName}/src/**/*.js`,
    `!<rootDir>/packages/actions/${packageName}/src/main.js`
  ],
  coverageReporters: ['json', 'lcov']
}
