/* eslint key-spacing:0 spaced-comment:0 */
import path from 'path'

import {argv} from 'yargs'

const config = {
  env : process.env.NODE_ENV || 'development',

  // ----------------------------------
  // Project Structure
  // ----------------------------------
  path_base  : path.resolve(__dirname, '..'),
  dir_client : '',
  dir_dist   : 'dist',
  dir_server : 'server',
  dir_test   : 'tests',

  // ----------------------------------
  // Server Configuration
  // ----------------------------------
  server_host : 'localhost',
  server_port : process.env.PORT || 3000,

  // ----------------------------------
  // Compiler Configuration
  // ----------------------------------
  compiler_css_modules     : true,
  compiler_devtool         : 'source-map',
  compiler_hash_type       : 'hash',
  compiler_fail_on_warning : false,
  compiler_quiet           : false,
  compiler_stats           : {
    chunks : false,
    chunkModules : false,
    colors : true,
    maxModules: false
  }
}

// ------------------------------------
// Environment
// ------------------------------------
// N.B.: globals added here must _also_ be added to .eslintrc
config.globals = {
  'process.env'  : {
    'NODE_ENV' : JSON.stringify(config.env)
  },
  'NODE_ENV'     : config.env,
  '__CI__'       : !!process.env.CI,
  '__DEV__'      : config.env === 'development',
  '__PROD__'     : config.env === 'production',
  '__STANDALONE__': config.env === 'standalone',
  '__BACKEND_URL__': JSON.stringify(''),
  '__PACKAGE__'   : argv.package,
  '__PACKAGE_NAME__'   : JSON.stringify(argv.package),
  '__NO_MOCK__': argv.noMock || false
}

// ------------------------------------
// Utilities
// ------------------------------------
const resolve = path.resolve
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args])

config.utils_paths = {
  base   : base,
  client : base.bind(null, config.dir_client)
}

export default config
