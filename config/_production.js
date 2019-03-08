export default config => ({
  globals: {
    ...config.globals,
    __BACKEND_URL__: config.globals.__BACKEND_URL__ || JSON.stringify('')
  }
})
