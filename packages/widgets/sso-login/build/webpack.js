import CopyWebpackPlugin from 'copy-webpack-plugin' // eslint-disable-line import/default

import {removeCKEditor} from '../../../../build/lib/webpack'

export const adjustConfig = (webpackConfig, config) => {
  const {__DEV__} = config.globals

  if (__DEV__) {
    webpackConfig.plugins.push(new CopyWebpackPlugin({patterns: ['./packages/widgets/sso-login/src/dev/test.html']}))
  }

  webpackConfig = removeCKEditor(webpackConfig)

  return webpackConfig
}
