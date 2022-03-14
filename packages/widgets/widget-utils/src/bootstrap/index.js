import bootstrapWidgets from './bootstrapWidgets'
import {getBackendUrl, loadScriptAsync} from './utils'
;(() => {
  let backendUrl, assetUrl
  if (window.backendUrl) {
    backendUrl = window.backendUrl
    assetUrl = getBackendUrl(document)
  } else {
    backendUrl = getBackendUrl(document)
    assetUrl = getBackendUrl(document)
  }

  const params = {
    backendUrl,
    assetUrl
  }

  // guarantee to initalize all widgets on the page
  document.addEventListener('DOMContentLoaded', async () => {
    await loadScriptAsync(`${assetUrl}/nice2/javascript/nice2-react.release.js`)
    await bootstrapWidgets(params)
  })
})()
