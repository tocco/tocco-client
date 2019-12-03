const base = require('./build/jest.config.base.js')

module.exports = {
  rootDir: './',
  ...base,
  coverageReporters: ['json', 'lcov']
}
