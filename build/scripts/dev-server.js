import yargs from 'yargs'
import {hideBin} from 'yargs/helpers'

import config from '../../config/index.js'
import server from '../../server/main.js'
import logger from '../lib/logger.js'
import {packagesExists} from '../lib/packages.js'

const argv = yargs(hideBin(process.argv)).argv

const port = config.server_port
const host = config.server_host

const packageName = argv.package

if (!packageName || !packagesExists(packageName)) {
  logger.error('Please select a valid package with --package={PACKAGE_NAME} parameter.')
  process.exit(1)
}

server.listen(port)
logger.success(`Server is now running at http://${host}:${port}.`)
