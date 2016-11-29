import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
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
    ? [APP_ENTRY_PATH, `webpack-hot-middleware/client?path=__webpack_hmr`]
    : [APP_ENTRY_PATH]
}


// ------------------------------------
// Bundle Output
// ------------------------------------

webpackConfig.output = {
  filename: 'index.js',
  path: outputDir,
  libraryTarget: 'umd'
}


// ------------------------------------
// Plugins
// ------------------------------------

webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals)
]

if (__PROD__) {
  // extract css from js and generate a separate file
  webpackConfig.plugins.push(
    new ExtractTextPlugin('index.css')
  )

  // provide an scss entrypoint
  // TODO Enhance handling of index.scss this by creating it dynamically rather than copying it to prevent duplications and boilerplate code. Afterwards all index.scss can be removed from packages.
  if ( __PACKAGE__ !== 'tocco-test-util' ) {
    webpackConfig.plugins.push(
      new CopyWebpackPlugin([
        {
          context: absolutePackagePath,
          from: 'src/index.scss',
          flatten: true
        }
      ])
    )
  }

  // copy all scss files for recompilation
  webpackConfig.plugins.push(
    new CopyWebpackPlugin([
      {
        from: `${packageDir}/src/**/*.scss`,
        flatten: false
      }
    ])
  )

  if ( __PACKAGE__ === 'tocco-ui' ) {
    // copy Font Awesome's scss files
    debug(`copy scss files from ${__PACKAGE__}/node_modules/font-awesome/ to ${__PACKAGE__}/dist/`);
    webpackConfig.plugins.push(
      new CopyWebpackPlugin([
        {
          from: `${packageDir}/node_modules/font-awesome/scss/*.scss`,
          flatten: false
        }
      ])
    )

    // copy Bootstrap's scss files
    debug(`copy scss files from ${__PACKAGE__}/node_modules/bootstrap-sass/ to ${__PACKAGE__}/dist/`);
    webpackConfig.plugins.push(
      new CopyWebpackPlugin([
        {
          from: `${packageDir}/node_modules/bootstrap-sass/assets/stylesheets/**/*.scss`,
          flatten: false
        }
      ])
    )
  }
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


// ------------------------------------
// Presets
// ------------------------------------

const presets = ['es2015', 'react', 'stage-0']

if (__DEV__) {
  presets.push('react-hmre')
}


// ------------------------------------
// Loaders
// ------------------------------------

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
              '**/dev/**',
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

// find all css files and integrate into index.js
webpackConfig.module.loaders.push({
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  })

// TODO remove "&& false" to separate css from js. Currently this would result in unstyled components.
if (__PROD__ && false) {
  // find all scss files and separate it from index.js
  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('css-loader!sass-loader')
  })
} else {
  // find all css files and integrate into index.js
  webpackConfig.module.loaders.push({
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass']
  })
}

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  {
    test: /\.woff(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
  },
  {
    test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
  },
  {
    test: /\.ttf(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?.*)?$/,
    loader: 'file?prefix=fonts/&name=[path][name].[ext]'
  },
  {
    test: /\.svg(\?.*)?$/,
    loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
  },
  {
    test: /\.(png|jpg)$/,
    loader: 'file?limit=8192'
  }
)
/* eslint-enable */

export default webpackConfig
