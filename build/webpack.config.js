import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import config from '../config'
import _debug from 'debug'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'

const debug = _debug('app:webpack:config')
const paths = config.utils_paths
const {__DEV__, __PROD__, __STANDALONE__, __TEST__, __PACKAGE__} = config.globals

const packageDir = `packages/${__PACKAGE__}`
const absolutePackagePath = paths.client(`${packageDir}/`)

const outputDir = absolutePackagePath + '/dist'

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: __PROD__ ? 'source-map' : 'eval',
  resolve: {
    modules: [
      path.resolve(paths.client(), packageDir, 'src'),
      'node_modules'
    ],
    alias: {
      'React': `${__dirname}/../node_modules/react/react.js`
    },
    extensions: ['.js', '.jsx', '.json']
  },
  performance: {
    hints: __PROD__ ? 'warning' : false
  },
  module: {}
}

if (!__TEST__) {
  webpackConfig.externals = {
    react: 'React',
    'react-dom': 'ReactDOM'
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
  path: outputDir,
  libraryTarget: 'umd',
  publicPath: '/'
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals)
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
}

if (__STANDALONE__) {
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

if (__DEV__) {
  debug('Enable plugin for case-sensitive path check')
  webpackConfig.plugins.push(new CaseSensitivePathsPlugin())

  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
} else if (__PROD__) {
  webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
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
}

webpackConfig.module.rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: ['transform-runtime'],
      presets: [
        ['es2015', { 'modules': false }],
        'react',
        'stage-0'
      ],
      env: {
        production: {
          plugins: [
            'transform-react-remove-prop-types',
            'transform-react-constant-elements'
          ]
        },
        development: {
          'presets': [
            'react-hmre'
          ]
        },
        test: {
          plugins: [['istanbul', {
            'exclude': [
              '**/dev/**',
              '**/*/*.spec.js',
              '**/tocco-ui/**/example.js',
              '**/tocco-ui/dist'
            ]
          }]]
        }
      }
    }
  }
]

if (__DEV__) {
  // Run linting but only show errors as warning
  webpackConfig.module.rules.push(
    {
      test: /\.jsx?$/,
      enforce: 'pre',
      use: ['eslint-loader']
    }
  )

  webpackConfig.plugins.push(
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          emitWarning: true
        }
      }
    })
  )
}

webpackConfig.module.rules.push(
  {
    test: /\.css$/,
    use: 'style-loader!css-loader'
  },
  {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  }
)

// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
  {
    test: /\.woff(\?.*)?$/,
    use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.*)?$/,
    use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
  },
  {
    test: /\.otf(\?.*)?$/,
    use: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?.*)?$/,
    use: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
  },
  {
    test: /\.svg(\?.*)?$/,
    use: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
  },
  {
    test: /\.(png|jpg)$/,
    use: 'file-loader?limit=8192'
  }
)
/* eslint-enable */

export default webpackConfig
