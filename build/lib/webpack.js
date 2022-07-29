import CKEditorWebpackPlugin from '@ckeditor/ckeditor5-dev-webpack-plugin'

import {getAllFiles, getPackageDirectory} from './packages'

const getAllApps = path => getAllFiles(path)

export const adjustConfigForBundles = (webpackConfig, config, paths) => {
  const {__PACKAGE__} = config.globals
  const packageDir = getPackageDirectory(__PACKAGE__)

  const path = paths.client(`${packageDir}/src/apps`)
  const appEntryFiles = getAllApps(path)

  const entry = appEntryFiles.reduce((acc, file) => ({...acc, [file.replace('.js', '')]: `${path}/${file}`}), {})

  webpackConfig.entry = entry
  webpackConfig.output.filename = '[name].js'

  return webpackConfig
}

export const removeCKEditor = webpackConfig => {
  webpackConfig.plugins = webpackConfig.plugins.filter(plugin => !(plugin instanceof CKEditorWebpackPlugin))
  return webpackConfig
}
