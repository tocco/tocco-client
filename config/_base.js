/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'

import {argv} from 'yargs'

const config = {
  env : process.env.NODE_ENV || 'development',
  path_base  : path.resolve(__dirname, '..'),
  dir_client : '',
  dir_dist   : 'dist',
  dir_server : 'server',

  server_host : 'localhost',
  server_port : process.env.PORT || 3000,

  compiler_fail_on_warning : false,
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true,
    maxModules: false
  }
}

config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__CI__'       : !!process.env.CI,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__STANDALONE__': config.env === 'standalone',
  '__BACKEND_URL__': JSON.stringify(argv.backend) || JSON.stringify(process.env.BACKEND),
  '__PACKAGE__'   : argv.package,
  '__PACKAGE_NAME__'   : JSON.stringify(argv.package),
  '__NO_MOCK__':  !!(process.env.BACKEND || argv.backend || argv.noMock)
}

const resolve = path.resolve
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args])

config.utils_paths = {
  base,
  client : base.bind(null, config.dir_client)
}

export default config
