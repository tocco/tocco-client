import {argv} from 'yargs'

import logger from '../lib/logger'
import webpackCompiler from '../webpack-compiler'
import webpackConfig from '../webpack.config'
import {packagesExists} from '../lib/packages'

const compile = () => {
  logger.info('Run compiler')

  const packageName = argv.package
  if (!packageName || !packagesExists(packageName)) {
    logger.error('Please select a valid package with --package={PACKAGE_NAME} parameter.')
    process.exit(1)
  }

  return Promise.resolve()
    .then(() => webpackCompiler(webpackConfig))
    .then(() => {
      logger.success('Compilation completed successfully.')
    })
    .catch(err => {
      logger.error('Compiler encountered an error.', err)
      process.exit(1)
    })
}

compile()
