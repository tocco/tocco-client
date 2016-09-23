import config from '../config'
import server from '../server/main'
import _debug from 'debug'
import {packagesExists} from './packages'

const debug = _debug('app:bin:server')
const port = config.server_port
const host = config.server_host

var packageName = process.env.npm_config_package

if (!packageName || !packagesExists(packageName)){
  debug('Please select a valid package with --package={PACKAGE_NAME} parameter.')
  process.exit(1)
}


server.listen(port)
debug(`Server is now running at http://${host}:${port}.`)
