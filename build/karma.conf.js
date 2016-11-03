import {argv} from 'yargs'
import config from '../config'
import webpackConfig from './webpack.config'
import _debug from 'debug'
import {getAllPackages} from '../bin/packages'

const debug = _debug('app:karma')
debug('Create configuration.')

var packages
if (config.globals.__PACKAGE__) {
  packages = [config.globals.__PACKAGE__]
} else {
  packages = getAllPackages()

  packages = packages.filter(pck => (
    !config.test_excluded_packages.includes(pck)
  ))
}
debug(`Run tests for packages: ${packages.join(', ')}`)

var testBundles = []
packages.forEach(pck => {
  testBundles.push(`packages/${pck}/${config.dir_test}/test-bundler.js`)
})
var bundlePreprocessors = {}
testBundles.forEach(bundle => {
  bundlePreprocessors[bundle] = ['webpack', 'sourcemap']
})

const karmaConfig = {
  basePath: '../',
  files: [
    './node_modules/babel-polyfill/dist/polyfill.js',
    './build/test-setup.js',
    ...testBundles

  ],
  singleRun: !argv.watch,
  frameworks: ['mocha'],
  reporters: ['mocha', 'coverage'],
  mochaReporter: {
    showDiff: true
  },
  preprocessors: {
    './build/test-setup.js': ['webpack'],
    ...bundlePreprocessors
  },
  browsers: ['PhantomJS'],
  browserDisconnectTimeout: 10000,
  browserNoActivityTimeout: 60000,
  webpack: {
    devtool: 'inline-source-map',
    resolve: {
      ...webpackConfig.resolve,
      alias: {
        ...webpackConfig.resolve.alias,
        sinon: 'sinon/pkg/sinon.js'
      }
    },
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals: {
      ...webpackConfig.externals,
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    },
    sassLoader: webpackConfig.sassLoader
  },
  webpackMiddleware: {
    noInfo: true
  },
  coverageReporter: config.coverage_reporters
}

// cannot use `export default` because of Karma.
module.exports = cfg => cfg.set(karmaConfig)
