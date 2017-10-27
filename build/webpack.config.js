import { argv } from 'yargs'
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import config from '../config'
import logger from './lib/logger'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import fs from 'fs'

const paths = config.utils_paths
const {__DEV__, __PROD__, __STANDALONE__, __TEST__, __PACKAGE__, __NICE2_11_LEGACY__} = config.globals

const packageDir = `packages/${__PACKAGE__}`
const absolutePackagePath = paths.client(`${packageDir}/`)

const outputDir = absolutePackagePath + '/dist'
const testPlugins = []

logger.info('Create webpack configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: __PROD__ || __NICE2_11_LEGACY__ ? 'source-map' : 'eval',
  resolve: {
    modules: [
      path.resolve(paths.client(), packageDir, 'src'),
      'node_modules',
      path.resolve(paths.client(), 'node_modules')
    ],
    alias: {
      'ReactDOM': `${__dirname}/../node_modules/react-dom/index.js`,
      'React': `${__dirname}/../node_modules/react/react.js`,
      'moment': `${__dirname}/../node_modules/moment/moment.js`
    },
    extensions: ['.js', '.jsx', '.json']
  },
  performance: {
    hints: __PROD__ || __NICE2_11_LEGACY__ ? 'warning' : false
  },
  module: {}
}

if (!__TEST__) {
  webpackConfig.externals = {
    'react': 'React',
    'React': 'React',
    'react-dom': 'ReactDOM',
    'ReactDOM': 'ReactDOM'
  }
}

// ------------------------------------
// Entry Points
// ------------------------------------

const APP_ENTRY_PATH = paths.client(`${packageDir}/src/main.js`)

webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY_PATH, `webpack-hot-middleware/client?path=/__webpack_hmr`]
    : [APP_ENTRY_PATH]
}

// ------------------------------------
// Bundle Output
// ------------------------------------

webpackConfig.output = {
  filename: 'index.js',
  chunkFilename: '[name]-chunk.js',
  path: outputDir,
  libraryTarget: 'umd',
  publicPath: ''
}

if (__NICE2_11_LEGACY__) {
  webpackConfig.output.filename = 'index_nice2_11_legacy.js'
}

// ------------------------------------
// Plugins
// ------------------------------------

webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new LodashModuleReplacementPlugin({
    shorthands: true,
    paths: true
  }),
  // prevent all moment locales from being loaded when importing momentjs
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /de|en|fr|it/)
]

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

  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  )

  webpackConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        context: `${packageDir}/src/`,
        from: '**/*.scss',
        flatten: true,
        to: 'scss'
      }
    ])
  )
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

// see: https://github.com/karma-runner/karma-sauce-launcher/issues/95
if (!process || !process.env || !process.env.DISABLE_ISTANBUL_COVERAGE) {
  logger.info('Enable instanbul test plugin.')
  testPlugins.push(['istanbul', {
    exclude: [
      '**/dev/**',
      '**/dist/**',
      '**/example.js',
      '**/*/*.spec.js'
    ]
  }])
}

if (argv.analyze) {
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: true
  }))
}

// ------------------------------------
// Modules
// ------------------------------------

webpackConfig.module.rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: [
        ['transform-imports', {
          'tocco-ui': {
            'transform': 'tocco-ui/src/${member}', // eslint-disable-line no-template-curly-in-string
            'preventFullImport': true
          },
          'tocco-util': {
            'transform': 'tocco-util/src/${member}', // eslint-disable-line no-template-curly-in-string
            'preventFullImport': true
          },
          'tocco-test-util': {
            'transform': 'tocco-test-util/src/${member}', // eslint-disable-line no-template-curly-in-string
            'preventFullImport': true
          }
        }],
        'transform-runtime',
        'transform-flow-strip-types',
        'syntax-dynamic-import'
      ],
      presets: [
        ['es2015', {modules: false}],
        'react',
        'stage-0'
      ],
      env: {
        production: {
          plugins: [
            'lodash',
            'transform-react-remove-prop-types',
            'transform-react-constant-elements'
          ]
        },
        development: {
          plugins: ['flow-react-proptypes'],
          presets: [
            'react-hmre'
          ]
        },
        test: {
          plugins: testPlugins
        }
      }
    }
  }
]

if (!__PROD__ && !__NICE2_11_LEGACY__) {
  // Run linting but only show errors as warning
  webpackConfig.module.rules.push(
    {
      test: /\.jsx?$/,
      enforce: 'pre',
      use: ['eslint-loader']
    }
  )

  // write all styles into index.js
  webpackConfig.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', `sass-loader?data=$node-env:${config.env};&includePaths[]=${paths.client()}/packages/tocco-theme/node_modules/`]  // eslint-disable-line
  })

  // File loaders
  /* eslint-disable */
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
      test: /\.(png|jpg)$/,
      use: 'file-loader?limit=8192'
    }
  )
  /* eslint-enable */
}

if (__NICE2_11_LEGACY__) {
  // optimize asset loading
  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    })
  )

  // Run linting but only show errors as warning
  webpackConfig.module.rules.push(
    {
      test: /\.jsx?$/,
      enforce: 'pre',
      use: ['eslint-loader']
    }
  )

  // write all styles into index.js
  webpackConfig.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', `sass-loader?data=$node-env:${config.env};&includePaths[]=${paths.client()}/packages/tocco-theme/node_modules/`]  // eslint-disable-line
  })

  // File loaders
  /* eslint-disable */
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
      test: /\.(png|jpg)$/,
      use: 'file-loader?limit=8192'
    }
  )
  /* eslint-enable */
}

const packageWebpackFile = packageDir + '/build/webpack.js'
if (fs.existsSync(packageWebpackFile)) {
  const adjustConfig = require(`../${packageWebpackFile}`).adjustConfig

  if (adjustConfig) {
    logger.info('Adjust configuration with package specific config.')
    adjustConfig(webpackConfig, config, paths)
  }
}

export default webpackConfig
