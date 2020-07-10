const path = require('path')

const base = require('../../build/jest.config.base.js')

const packageName = path.basename(__dirname)

module.exports = {
  rootDir: '../..',
  ...base,
  name: packageName,
  displayName: packageName,
  testMatch: [
    `<rootDir>/packages/${packageName}/src/**/*.spec.{js,jsx}`
  ],
  collectCoverageFrom: [
    `<rootDir>/packages/${packageName}/src/**/*.js`,
    `!<rootDir>/packages/${packageName}/src/main.js`
  ],
  coverageReporters: ['json', 'lcov']
}
