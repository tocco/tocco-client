const path = require('path')

function createJestConfig(packageDirname) {
  const packageName = path.basename(packageDirname)

  const rootDir = path.join(__dirname, '..')
  const relativePackageDir = path.relative(rootDir, packageDirname)

  const srcPath = relativePackageDir ? `/${relativePackageDir}/src/` : '/packages/'

  return {
    rootDir,
    setupFilesAfterEnv: ['<rootDir>/build/jest-setup.js'],
    transformIgnorePatterns: ['node_modules/(?!redux-form|lodash-es|redux-saga|uuid)'],
    moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/fileMock.js',
      '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js'
    },
    globals: {
      __DEV__: false,
      __BACKEND_URL__: ''
    },
    verbose: true,
    collectCoverage: true,
    cacheDirectory: '.jestcache',
    coverageReporters: ['json', 'lcov'],
    testEnvironment: 'jsdom',
    displayName: packageName,
    testMatch: [`<rootDir>${srcPath}**/*.spec.{js,jsx}`],
    collectCoverageFrom: [`<rootDir>${srcPath}**/*.js`, `!<rootDir>${srcPath}**/main.js`],
    coverageDirectory: `<rootDir>${srcPath}coverage/`
  }
}

module.exports = createJestConfig
