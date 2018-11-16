import webpack from 'webpack'

import config from '../config'
import logger from './lib/logger'

const DEFAULT_STATS_FORMAT = config.compiler_stats

export default function webpackCompiler(webpackConfig, statsFormat = DEFAULT_STATS_FORMAT) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run((err, stats) => {
      const jsonStats = stats.toJson()

      logger.success('Webpack compile completed.')

      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      } else if (jsonStats.errors.length > 0) {
        logger.error('Webpack compiler encountered errors.')
        logger.error(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        logger.warn('Webpack compiler encountered warnings.')
        logger.warn(jsonStats.warnings.join('\n'))
      } else {
        logger.success('No errors or warnings encountered.')
      }
      resolve(jsonStats)
    })
  })
}
