import chalk from 'chalk'

import logger from '../build/lib/logger.js'
import config from './_base.js'
import developmentConfig from './_development.js'
import productionConfig from './_production.js'

const overrideConfigs = {
  development: developmentConfig,
  production: productionConfig
}

logger.info('Create configuration.')
logger.info(`Apply environment overrides for NODE_ENV ${chalk.bold(config.env)}.`)

const hasOverridesFile = Boolean(overrideConfigs[config.env])

let overrides
if (hasOverridesFile) {
  overrides = overrideConfigs[config.env](config)
} else {
  logger.info(`No configuration overrides found for NODE_ENV "${config.env}"`)
}

export default {...config, ...overrides}
