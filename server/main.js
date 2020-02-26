const path = require('path')

const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
const compress = require('compression')
const request = require('request')

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
  app.use('/static', express.static('server/static'))

  // Most probably the following requests should be answered by the Nice2 instance
  // -> pipe them through
  app.use(['/nice2/*', '/js/*', '/img/*', '/css/*'], function(req, res, next) {
    // `window.location.hostname` might be used in __BACKEND_URL__ variable
    // eslint-disable-next-line
    const window = {location: {hostname: 'localhost'}}
    // eslint-disable-next-line
    const newUrl = eval(config.globals.__BACKEND_URL__) + req.originalUrl
    req.pipe(
      request[req.method.toLowerCase()](newUrl))
      .pipe(res)
  })

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
