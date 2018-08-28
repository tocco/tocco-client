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
    }
  }

  cfg.set({
    reporters: ['saucelabs', 'mocha'],
    concurrency: 5,
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers)
  })
}
