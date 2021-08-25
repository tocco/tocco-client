/* eslint-disable max-len */
import fs from 'fs'

import {argv} from 'yargs'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import DotEnv from 'dotenv-webpack'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

import config from '../config'
import logger from './lib/logger'

const paths = config.utils_paths
const {__CI__, __DEV__, __PROD__, __PACKAGE__, __NO_MOCK__} = config.globals

const packageDir = `packages/${__PACKAGE__}`
const absolutePackagePath = paths.client(`${packageDir}/`)

const outputDir = absolutePackagePath + '/dist'

logger.info('Create webpack configuration.')
const webpackConfig = {
  mode: __PROD__ ? 'production' : 'development',
  devtool: false,
  resolve: {
    alias: {
      ...(__DEV__ ? {'react-dom': '@hot-loader/react-dom'} : {})
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
      new webpack.optimize.MinChunkSizePlugin({minChunkSize: 100000})
    ]
  }
}

webpackConfig.output = {
  filename: 'index.js',
  chunkFilename: 'chunk-[name].[contenthash].js', // content hash ensures a unique name and reduces cash problems with new releases
  path: outputDir,
  libraryTarget: 'umd',
  library: `tocco-${__PACKAGE__}`, // needed to run multiple apps on same page
  publicPath: '/',
  clean: true
}

webpackConfig.plugins = [
  new webpack.DefinePlugin({
    ...config.globals,
    niceFile: JSON.stringify(__NO_MOCK__
      ? '<script src="/nice2/javascript/nice2-newclient-react-registry.release.js"></script>'
      : '') // loads  legacy js file in index.html only with real (not mocked) backend
  }),
  new LodashModuleReplacementPlugin({
    shorthands: true,
    paths: true,
    collections: true
  }), // optimize lodash import. reduces bundle size by around 30kb
  new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(de|en|fr|it)$/), // prevent all moment locales from being loaded when importing momentjs
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
  webpackConfig.plugins.push(new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1 // no chunks due to ChunkLoadErrors during development
  }))
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: paths.client('server/index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body'
    })
  )
  webpackConfig.plugins.push(new CaseSensitivePathsPlugin())
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  webpackConfig.plugins.push(new ReactRefreshWebpackPlugin())
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

// look and append package webpack file config
const packageWebpackFile = packageDir + '/build/webpack.js'
if (fs.existsSync(packageWebpackFile)) {
  const adjustConfig = require(`../${packageWebpackFile}`).adjustConfig

  if (adjustConfig) {
    logger.info('Adjust configuration with package specific config.')
    adjustConfig(webpackConfig, config, paths)
  }
}

export default webpackConfig
