// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
export default config => ({
  proxy: {
    enabled: false,
    options: {
      // koa-proxy options
      host: 'http://localhost:8000',
      match: /^\/api\/.*/
    }
  },
  globals: Object.assign({}, config.globals, {
    __BACKEND_URL__: JSON.stringify('http://:8080')
  })
})
