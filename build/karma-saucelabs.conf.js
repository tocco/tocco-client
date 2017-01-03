import baseCfg from './karma.conf'

module.exports = cfg => {
  baseCfg(cfg)

  const customLaunchers = {
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 10',
      version: 'latest'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Windows 10',
      version: 'latest'
    },
    sl_osx_safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'macOS 10.12',
      version: 'latest'
    },
    sl_edge: {
      base: 'SauceLabs',
      browserName: 'microsoftedge',
      platform: 'Windows 10',
      version: 'latest'
    }
  }

  cfg.set({
    reporters: ['saucelabs', 'mocha', 'coverage'],
    concurrency: 5,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 4 * 60 * 1000,
    captureTimeout: 4 * 60 * 1000
  })
}
