import bootstrapWidgets from './bootstrapWidgets'
import {getBackendUrl, loadScriptAsync} from './utils'

;(() => {
  const backendUrl = getBackendUrl(document)

  const params = {
    backendUrl
  }

  // guarantee to initalize all widgets on the page
  document.addEventListener('DOMContentLoaded', async () => {
    await loadScriptAsync(`${backendUrl}/nice2/javascript/nice2-react.release.js`)
    await bootstrapWidgets(params)
  })
})()
