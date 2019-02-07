// We use an explicit public path when the assets are served by webpack
// to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
import {setBackendUrl} from './_base'

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
    __BACKEND_URL__: setBackendUrl() || "'http://' + window.location.hostname + ':8080'"
  }
})
