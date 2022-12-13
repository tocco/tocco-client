const compress = require('compression')
const express = require('express')
const {createProxyMiddleware} = require('http-proxy-middleware')

const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080'

const app = express()
app.use(compress()) // Apply gzip compression

app.use(
  ['/nice2/*', '/js/*', '/img/*', '/css/*'],
  createProxyMiddleware({
    target: backendUrl,
    changeOrigin: true
  })
)

app.use('*', function (req, res, next) {
  const widgetKey = req.query.key

  const result = `<!DOCTYPE html>

<html lang="de-CH">
<head>
    <meta charset="utf-8">
    <title>Widget</title>
    <meta name="description" content="Tocco Widgets">
</head>
<body>
    <h1>Widget</h1>
    <div data-tocco-widget-ref="${widgetKey}" data-tocco-widget-states="list">Listenansicht</div>
    <div data-tocco-widget-ref="${widgetKey}" data-tocco-widget-states="detail">Detailansicht</div>

    <script>window.toccoBackendUrl = "http://localhost:3000";</script>
    <div data-id="widget" data-tocco-widget-key="${widgetKey}"></div>
    <script src="http://localhost:3000/js/tocco-widget-utils/dist/bootstrap.js"></script>
</body>
</html>
  `

  res.set('content-type', 'text/html')
  res.send(result)
  res.end()
})

app.listen(3000)
