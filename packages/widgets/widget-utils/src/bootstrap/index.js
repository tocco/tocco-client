import bootstrapWidgets from './bootstrapWidgets'
import {BACKEND_URL} from './constants'
import {getAssetUrl, loadScriptAsync} from './utils'
;(() => {
  const assetUrl = getAssetUrl(document)
  let backendUrl
  if (window[BACKEND_URL]) {
    backendUrl = window[BACKEND_URL]
  } else {
    backendUrl = assetUrl
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
