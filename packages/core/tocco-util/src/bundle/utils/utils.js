export const getDistPath = packageName => `/js/tocco-${packageName}/dist/`

export const getEntryFilePath = (packageName, appName) => {
  const entryFilename = packageName !== appName ? appName : 'index'
  return `${getDistPath(packageName)}${entryFilename}.js`
}
