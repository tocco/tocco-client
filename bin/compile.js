import _debug from 'debug'
import webpackCompiler from '../build/webpack-compiler'
import webpackConfig from '../build/webpack.config'
import config from '../config'
import {packagesExists} from './packages'

const debug = _debug('app:bin:compile')

const compile = () => {
  debug('Run compiler')

  const packageName = process.env.npm_config_package
  if (!packageName || !packagesExists(packageName)) {
    debug('Please select a valid package with --package={PACKAGE_NAME} parameter.')
    process.exit(1)
  }

  return Promise.resolve()
    .then(() => webpackCompiler(webpackConfig))
    .then(stats => {
      if (stats.warnings.length && config.compiler_fail_on_warning) {
        throw new Error('Config set to fail on warning, exiting with status code "1".')
      }
    })
    .then(() => {
      debug('Compilation completed successfully.')
    })
    .catch(err => {
      debug('Compiler encountered an error.', err)
      process.exit(1)
    })
}

compile()
