import config from '../config'
import server from '../server/main'
import _debug from 'debug'

const debug = _debug('app:bin:server')
const port = config.server_port
const host = config.server_host

if (!process.env.npm_config_package) {
  debug('You have to specify a package with --package={PACKAGE_NAME}.')
  process.exit(1)
}

server.listen(port)
debug(`Server is now running at http://${host}:${port}.`)
