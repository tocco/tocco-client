import webpack from 'webpack'

import runConfig from '../config'

module.exports = ({config, configType}) => {
  config.plugins.push(new webpack.DefinePlugin(runConfig.globals))

  const babelLoaderRule = config.module.rules.find(element => {
    return element.use.find(usageObject => {
      return usageObject.loader === 'babel-loader'
    })
  })

  babelLoaderRule.exclude[0] = /node_modules/

  config.module.rules = config.module.rules.map(data => {
    if (/svg\|/.test(String(data.test))) {
      data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/
    }
    return data
  })

  config.module.rules.push({
    test: /\.scss$/,
      use: ['style-loader', 'css-loader', `sass-loader?data=$node-env:${runConfig.env};&includePaths[]=./packages/tocco-theme/node_modules/`]  // eslint-disable-line
  },
  {
    test: /\.woff(\?.*)?$/,
    use: 'file-loader?name=fonts/[name].[ext]&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.*)?$/,
    use: 'file-loader?name=fonts/[name].[ext]&mimetype=application/font-woff2'
  },
  {
    test: /\.otf(\?.*)?$/,
    use: 'file-loader?name=fonts/[name].[ext]&mimetype=font/opentype'
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: 'file-loader?name=fonts/[name].[ext]&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?.*)?$/,
    use: 'file-loader?name=fonts/[name].[ext]'
  },
  {
    test: /\.svg(\?.*)?$/,
    use: 'file-loader?name=fonts/[name].[ext]&mimetype=image/svg+xml'
  },
  {
    test: /\.(png|jpg)$/,
    use: 'file-loader?limit=8192'
  }
  )

  return config
}
