import path from 'path'

import compress from 'compression'
import express from 'express'
import request from 'request'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import logger from '../build/lib/logger.js'
import webpackConfig from '../build/webpack.config.js'
import config from '../config/index.js'

const app = express()
app.use(compress()) // Apply gzip compression

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
const publicPath = webpackConfig.output.path

if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  const wdm = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  })

  logger.info('Enabling webpack dev and HMR middleware')
  app.use(wdm)
  wdm.waitUntilValid(() => {
    logger.success('Compilation finished! Hot reload is watching for changes...')
  })

  app.use(webpackHotMiddleware(compiler))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.

  app.use(express.static(publicPath))
  app.use('/static', express.static('server/static'))

  if (config.globals.__NO_MOCK__) {
    // Most probably the following requests should be answered by the Nice2 instance
    // -> pipe them through
    app.use(['/nice2/*', '/js/*', '/img/*', '/css/*'], function (req, res, next) {
      // `window.location.hostname` might be used in __BACKEND_URL__ variable
      // eslint-disable-next-line
      const window = {location: {hostname: 'localhost'}}
      // eslint-disable-next-line
      const newUrl = eval(config.globals.__BACKEND_URL__) + req.originalUrl
      req.pipe(request[req.method.toLowerCase()](newUrl)).pipe(res)
    })
  }

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
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
    'Server is being run outside of live development mode, meaning it will ' +
      'only serve the compiled application bundle in ~/dist. Generally you ' +
      'do not need an application server for this and can instead use a web ' +
      'server such as nginx to serve your static files. See the "deployment" ' +
      'section in the README for more information on deployment strategies.'
  )
}

export default app
