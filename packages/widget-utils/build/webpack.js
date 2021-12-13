export const adjustConfig = (webpackConfig, config) => {
  webpackConfig.entry[0] = webpackConfig.entry[0].replace('/main.js', '/bootstrap/index.js')
  webpackConfig.output.filename = 'bootstrap.js'

  return webpackConfig
}
