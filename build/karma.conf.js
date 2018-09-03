import {argv} from 'yargs'

import config from '../config'
import webpackConfig from './webpack.config'
import logger from './lib/logger'
import {getAllPackages} from './lib/packages'

logger.info('Create Karma configuration.')

let packages
if (config.globals.__PACKAGE__) {
  packages = [config.globals.__PACKAGE__]
} else {
  packages = getAllPackages()

  packages = packages.filter(pck => (
    !config.test_excluded_packages.includes(pck)
  ))
}

logger.info(`Run tests for packages: ${packages.join(', ')}`)

const testBundles = []
packages.forEach(pck => {
  testBundles.push(`packages/${pck}/${config.dir_test}/test-bundler.js`)
})
const bundlePreprocessors = {}
testBundles.forEach(bundle => {
  bundlePreprocessors[bundle] = ['webpack', 'sourcemap']
})

const karmaConfig = {
  basePath: '../',
  files: [
    './node_modules/babel-polyfill/dist/polyfill.js',
    './node_modules/intl/dist/Intl.js',
    './node_modules/whatwg-fetch/fetch.js',
    './build/test-setup.js',
    ...testBundles
  ],
  singleRun: !argv.watch,
  frameworks: ['mocha'],
  reporters: ['mocha', 'coverage'],
  mochaReporter: {
    showDiff: true
  },
  client: {
    mocha: {
      timeout: 20000
    }
  },
  preprocessors: {
    './build/test-setup.js': ['webpack'],
    ...bundlePreprocessors
  },
  browsers: ['ChromeHeadless'],
  concurrency: Infinity,
  webpack: {
    mode: 'development',
    performance: {
      hints: false
    },
    devtool: 'cheap-module-source-map',
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
      rules: webpackConfig.module.rules.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports-loader?define=>false,require=>false'
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
    }
  },
  webpackMiddleware: {
    noInfo: true,
    stats: 'errors-only'
  },
  coverageReporter: config.coverage_reporters
}

export default cfg => cfg.set(karmaConfig)
