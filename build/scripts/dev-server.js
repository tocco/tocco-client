import {argv} from 'yargs'

import config from '../../config/index'
import server from '../../server/main'
import logger from '../lib/logger'
import {packagesExists} from '../lib/packages'

const port = config.server_port
const host = config.server_host

const packageName = argv.package

if (!packageName || !packagesExists(packageName)) {
  logger.error('Please select a valid package with --package={PACKAGE_NAME} parameter.')
  process.exit(1)
}

server.listen(port)
logger.success(`Server is now running at http://${host}:${port}.`)
