import _debug from 'debug'
import webpackCompiler from '../build/webpack-compiler'
import webpackConfig from '../build/webpack.config'
import config from '../config'
import {packagesExists} from './packages'

const debug = _debug('app:bin:compile')

  ;
(async function () {
  try {
    debug('Run compiler')

    var packageName = process.env.npm_config_package

    if (!packageName || !packagesExists(packageName)) {
      debug('Please select a valid package with --package={PACKAGE_NAME} parameter.')
      process.exit(1)
    }

    const stats = await webpackCompiler(webpackConfig)
    if (stats.warnings.length && config.compiler_fail_on_warning) {
      debug('Config set to fail on warning, exiting with status code "1".')
      process.exit(1)
    }
  } catch (e) {
    debug('Compiler encountered an error.', e)
    process.exit(1)
  }
})()
