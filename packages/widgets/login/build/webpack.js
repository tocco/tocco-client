import {getPackageDirectory} from '../../../../build/lib/packages'

export const adjustConfig = (webpackConfig, config, paths) => {
  const {__APP__, __PACKAGE__, __DEV__, __PROD__} = config.globals
  const packageDir = getPackageDirectory(__PACKAGE__)

  const baseEntry = webpackConfig.entry.slice(0, -1) // remove last entry (main.js)

  if (__DEV__ && __APP__ === 'password-update') {
    webpackConfig.entry = [...baseEntry, paths.client(`${packageDir}/src/mainPasswordUpdate.js`)]
  }

  if (__PROD__) {
    // if packageName and appName is not the same `bootstrapWidgets` expects different entry file
    webpackConfig.entry = {
      index: [...baseEntry, paths.client(`${packageDir}/src/main.js`)],
      'password-update': [...baseEntry, paths.client(`${packageDir}/src/mainPasswordUpdate.js`)]
    }
    webpackConfig.output.filename = '[name].js'
  }

  return webpackConfig
}
