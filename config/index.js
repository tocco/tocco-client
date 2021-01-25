import fs from 'fs'
import path from 'path'

import chalk from 'chalk'

import logger from '../build/lib/logger'
import config from './_base'

logger.info('Create configuration.')
logger.info(`Apply environment overrides for NODE_ENV ${chalk.bold(config.env)}.`)

const overridesFilename = `_${config.env}`
let hasOverridesFile
try {
  // eslint-disable-next-line node/no-path-concat
  fs.lstatSync(path.join(__dirname), `${overridesFilename}.js`)
  hasOverridesFile = true
} catch (e) {}

let overrides
if (hasOverridesFile) {
  overrides = require(`./${overridesFilename}`).default(config)
} else {
  logger.info(`No configuration overrides found for NODE_ENV "${config.env}"`)
}

export default {...config, ...overrides}
