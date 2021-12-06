module.exports = {
  setupFilesAfterEnv: ['<rootDir>/build/jest-setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!redux-form|lodash-es|redux-saga)'
  ],
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
  coverageDirectory: '<rootDir>/coverage/',
  cacheDirectory: '.jestcache',
  testEnvironment: 'jsdom'
}
