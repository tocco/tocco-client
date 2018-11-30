import CopyWebpackPlugin from 'copy-webpack-plugin'

export const adjustConfig = (webpackConfig, config) => {
  const {__DEV__} = config.globals

  if (__DEV__) {
    webpackConfig.plugins.push(
      new CopyWebpackPlugin([
        './packages/sso-login/src/dev/test.html'
      ])
    )
  }

  return webpackConfig
}
