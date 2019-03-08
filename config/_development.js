import {argv} from 'yargs'
// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809

export const getUrl = () => JSON.stringify(argv.backend) || JSON.stringify(process.env.BACKEND)
export const getNoMock = () => !!(process.env.BACKEND || argv.backend || argv.noMock)

export default config => ({
  proxy: {
    enabled: false,
    options: {
      // koa-proxy options
      host: 'http://localhost:8000',
      match: /^\/api\/.*/
    }
  },
  globals: {
    ...config.globals,
    __BACKEND_URL__: getUrl() || "'http://' + window.location.hostname + ':8080'",
    __NO_MOCK__: getNoMock() || false
  }
})
