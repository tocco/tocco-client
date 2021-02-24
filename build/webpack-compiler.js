import webpack from 'webpack'

import logger from './lib/logger'

export default function webpackCompiler(webpackConfig) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig)

    compiler.run((err, stats) => {
      logger.success('Webpack compile completed.')

      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      } else {
        logger.log(stats.toString({
          chunks: false,
          colors: true
        }))
      }
      resolve()
    })
  })
}
