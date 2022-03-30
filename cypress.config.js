const {defineConfig} = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 180000,
  env: {
    BACKEND_URL: 'http://localhost:8080'
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  projectId: 'zv466c',
  viewportWidth: 1400,
  viewportHeight: 800,
  e2e: {
    baseUrl: 'http://localhost:8080',
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  }
})
