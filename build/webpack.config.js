import path from 'path'
import fs from 'fs'

import {argv} from 'yargs'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import {CleanWebpackPlugin} from 'clean-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import DotEnv from 'dotenv-webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import config from '../config'
import logger from './lib/logger'

const paths = config.utils_paths
const {__CI__, __DEV__, __PROD__, __PACKAGE__} = config.globals

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
      moment: path.join(__dirname, '..', 'node_modules', 'moment', 'moment.js')
    }
  },
  module: {},
  externals: {
    ...(__PROD__ ? {'react': 'React', 'react-dom': 'ReactDOM'} : {})
  },
  entry: [
    ...(__DEV__ ? ['webpack-hot-middleware/client'] : []),
    paths.client(`${packageDir}/src/main.js`)
  ],
  optimization: {
    minimizer: [
      ...(!__DEV__ ? [new TerserPlugin({extractComments: false, sourceMap: true})] : []),
      new webpack.optimize.MinChunkSizePlugin({minChunkSize: 10000})
    ]
  }
}

webpackConfig.output = {
  filename: 'index.js',
  chunkFilename: 'chunk-[name].[contenthash].js',
  path: outputDir,
  libraryTarget: 'umd',
  library: `tocco-${__PACKAGE__}`,
  publicPath: '/'
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
  new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(de|en|fr|it)$/),
  new DotEnv()
]

if (!__CI__) {
  const SourceMapPlugin = __DEV__ ? webpack.EvalSourceMapDevToolPlugin : webpack.SourceMapDevToolPlugin
  webpackConfig.plugins.push(new SourceMapPlugin({
    filename: '[file].map',
    exclude: /chunk-vendor.+\.js/
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
  webpackConfig.plugins.push(new ReactRefreshWebpackPlugin())
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
    loader: 'babel-loader',
    sideEffects: false,
    options: {
      plugins: __DEV__ ? ['react-refresh/babel'] : []
    }
  }
]

webpackConfig.module.rules.push(
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.woff(\?.*)?$/,
    use: 'file-loader?name=fonts/[name].[contenthash].[ext]&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.*)?$/,
    use: 'file-loader?name=fonts/[name].[contenthash].[ext]&mimetype=application/font-woff2'
  },
  {
    test: /\.otf(\?.*)?$/,
    use: 'file-loader?name=fonts/[name].[contenthash].[ext]&mimetype=font/opentype'
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: 'file-loader?name=fonts/[name].[contenthash].[ext]&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?.*)?$/,
    use: 'file-loader?name=fonts/[name].[contenthash].[ext]'
  },
  {
    test: /\.svg(\?.*)?$/,
    use: 'file-loader?name=imgs/[name].[contenthash].[ext]&mimetype=image/svg+xml'
  },
  {
    test: /\.(png|jpg|ico)$/,
    use: 'file-loader?name=imgs/[name].[contenthash].[ext]&limit=8192'
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
