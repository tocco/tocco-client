const base = require('./build/jest.config.base.js')

module.exports = {
  projects: [
    '<rootDir>/packages/*'
  ],
  rootDir: './',
  ...base,
  coverageReporters: ['json', 'lcov']
}
