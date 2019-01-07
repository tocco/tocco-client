import webpack from 'webpack'

import config from '../config'

module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.plugins.push(new webpack.DefinePlugin(config.globals))

  return storybookBaseConfig
}
