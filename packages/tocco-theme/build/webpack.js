import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'

export const adjustConfig = (webpackConfig, config, paths) => {
  const {__PROD__} = config.globals

  if (__PROD__) {
    webpackConfig.plugins.push(
      new CopyWebpackPlugin([
        {
          context: 'packages/tocco-theme/src/ToccoTheme',
          from: '**/*.scss'
        }
      ])
    )
    webpackConfig.plugins.push(
      new ExtractTextPlugin({
        filename: 'tocco-theme.css'
      })
    )

    webpackConfig.module.rules.push({
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', `sass-loader?data=$node-env:${config.env};&includePaths[]=${paths.client()}/packages/tocco-theme/node_modules/`]  // eslint-disable-line
      })
    })
  }

  return webpackConfig
}
