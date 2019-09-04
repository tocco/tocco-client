import path from 'path'
import fs from 'fs'

import {argv} from 'yargs'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import DotEnv from 'dotenv-webpack'

import config from '../config'
import logger from './lib/logger'

const paths = config.utils_paths
const {__CI__, __DEV__, __PROD__, __STANDALONE__, __PACKAGE__} = config.globals

const packageDir = `packages/${__PACKAGE__}`
const absolutePackagePath = paths.client(`${packageDir}/`)

const outputDir = absolutePackagePath + '/dist'

logger.info('Create webpack configuration.')
const webpackConfig = {
  mode: __PROD__ ? 'production' : 'development',
  name: 'client',
  devtool: false,
  resolve: {
    modules: [
      path.resolve(paths.client(), packageDir, 'src'),
      'node_modules',
      path.resolve(paths.client(), 'node_modules')
    ],
    alias: {
      ...(__DEV__ ? {'react-dom': '@hot-loader/react-dom'} : {}),
      moment: `${__dirname}/../node_modules/moment/moment.js`
    }
  },
  performance: {
    hints: __PROD__ ? 'warning' : false
  },
  module: {},

  externals: {
    ...(__PROD__ ? {'react': 'React', 'react-dom': 'ReactDOM'} : {})
  },
  entry: [
    ...(__DEV__ ? ['webpack-hot-middleware/client', 'react-hot-loader/patch'] : []),
    paths.client(`${packageDir}/src/main.js`)
  ]
}

webpackConfig.output = {
  filename: 'index.js',
  chunkFilename: '[name]-chunk-[chunkhash:6].js',
  path: outputDir,
  libraryTarget: 'umd',
  publicPath: '/',
  jsonpFunction: __PACKAGE__ + 'jsonp'
}

webpackConfig.plugins = [
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin(config.globals),
  new LodashModuleReplacementPlugin({
    shorthands: true,
    paths: true,
    collections: true
  }),
  // prevent all moment locales from being loaded when importing momentjs
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de|en|fr|it/),
  new DotEnv()
]

if (!__CI__) {
  const SourceMapPlugin = __DEV__ ? webpack.EvalSourceMapDevToolPlugin : webpack.SourceMapDevToolPlugin
  webpackConfig.plugins.push(new SourceMapPlugin({
    filename: '[file].map',
    exclude: /vendors~.+\.js/
  }))
}

if (__DEV__) {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: paths.client('server/index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  )
  webpackConfig.plugins.push(new CaseSensitivePathsPlugin())
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          emitWarning: true
        }
      }
    })
  )
} else if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }))

  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin())
} else if (__STANDALONE__) {
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: paths.client('server/standalone.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  )
}

if (argv['bundle-analyzer']) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: true
  }))
}

webpackConfig.module.rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  }
]

webpackConfig.module.rules.push(
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
    test: /\.(png|jpg|ico)$/,
    use: 'file-loader?limit=8192'
  }
)

const packageWebpackFile = packageDir + '/build/webpack.js'
if (fs.existsSync(packageWebpackFile)) {
  const adjustConfig = require(`../${packageWebpackFile}`).adjustConfig

  if (adjustConfig) {
    logger.info('Adjust configuration with package specific config.')
    adjustConfig(webpackConfig, config, paths)
  }
}

export default webpackConfig
