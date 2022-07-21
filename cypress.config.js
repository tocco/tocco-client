const {defineConfig} = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 180000,
  env: {
    BACKEND_URL: 'https://master.tocco.ch'
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  projectId: 'zv466c',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}'
  }
})
