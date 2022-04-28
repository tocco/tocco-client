import CopyWebpackPlugin from 'copy-webpack-plugin' // eslint-disable-line import/default

export const adjustConfig = (webpackConfig, config) => {
  const {__DEV__} = config.globals

  if (__DEV__) {
    webpackConfig.plugins.push(new CopyWebpackPlugin({patterns: ['./packages/widgets/sso-login/src/dev/test.html']}))
  }

  return webpackConfig
}
