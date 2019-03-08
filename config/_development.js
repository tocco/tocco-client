export default config => ({
  globals: {
    ...config.globals,
    __BACKEND_URL__: config.globals.__BACKEND_URL__ || "'http://' + window.location.hostname + ':8080'"
  }
})
