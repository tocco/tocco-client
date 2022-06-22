import {getEntryFilePath} from './utils'

export const loadScriptAsync = src =>
  new Promise((resolve, reject) => {
    const tag = document.createElement('script')
    tag.src = src
    tag.async = true
    tag.type = 'text/javascript'
    tag.onload = () => {
      resolve()
    }
    tag.onerror = () => {
      reject(new Error('Could not load script.'))
    }
    tag.crossorogin = true

    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  })

export const loadBundle = async (packageName, appName) => {
  const bundleName = `tocco-${appName}`
  let bundle = window[bundleName]

  if (!bundle) {
    await loadScriptAsync(getEntryFilePath(packageName, appName))
    bundle = window[bundleName]
  }

  return bundle
}
