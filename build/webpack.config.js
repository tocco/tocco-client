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
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.client() + packageDir,
    alias: {
      'React': `${__dirname}/../node_modules/react/react.js`
    },
    extensions: ['', '.js', '.jsx', '.json']
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
    ? [APP_ENTRY_PATH, `webpack-hot-middleware/client?path=${config.compiler_public_path}__webpack_hmr`]
    : [APP_ENTRY_PATH]
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: 'index.js',
  path: outputDir,
  publicPath: config.compiler_public_path,
  libraryTarget: 'umd'
}
if (__PROD__) {
  webpackConfig.output.publicPath = `/nice2/node_modules/${__PACKAGE__}/dist/`
}

if (__STANDALONE__) {
  webpackConfig.output.publicPath = ''
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

const presets = ['es2015', 'react', 'stage-0']

if (__DEV__) {
  presets.push('react-hmre')
}

webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      plugins: ['transform-runtime'],
      presets: presets,
      env: {
        production: {
          plugins: [
            'transform-react-remove-prop-types',
            'transform-react-constant-elements'
          ]
        },
        test: {
          plugins: [['istanbul', {
            'exclude': [
              '**/*/*.spec.js',
              '**/tocco-ui/**/example.js',
              '**/tocco-ui/dist'
            ]
          }]]
        }
      }
    }
  },
  {
    test: /\.json$/,
    loader: 'json'
  }
]

webpackConfig.module.loaders.push(
  { test: /\.css$/, loader: 'style-loader!css-loader' },
  { test: /\.scss$/, loaders: ['style', 'css', 'sass']
  }
)

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
)
/* eslint-enable */

export default webpackConfig
