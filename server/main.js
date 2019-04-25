const path = require('path')

const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
const compress = require('compression')

const webpackConfig = require('../build/webpack.config').default
const config = require('../config').default
const logger = require('../build/lib/logger').default

const app = express()
app.use(compress()) // Apply gzip compression

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
const publicPath = webpackConfig.output.path

if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  const wdm = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    logLevel: 'warn'
  })

  logger.info('Enabling webpack dev and HMR middleware')
  app.use(wdm)
  wdm.waitUntilValid(() => {
    logger.success('Compilation finished! Hot reload is watching for changes...')
    opn(`http://${config.server_host}:${config.server_port}`)
  })

  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.

  app.use(express.static(publicPath))
  app.use(express.static('server/static'))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function(req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  logger.warn(
    'Server is being run outside of live development mode, meaning it will '
    + 'only serve the compiled application bundle in ~/dist. Generally you '
    + 'do not need an application server for this and can instead use a web '
    + 'server such as nginx to serve your static files. See the "deployment" '
    + 'section in the README for more information on deployment strategies.'
  )
}

module.exports = app
