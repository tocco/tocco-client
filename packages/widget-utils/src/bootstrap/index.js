import bootstrapWidgets from './bootstrapWidgets'
import {loadScriptAsync, getBackendUrl} from './utils'

;(async () => {
  const backendUrl = getBackendUrl(document)

  const params = {
    backendUrl
  }

  await loadScriptAsync(`${backendUrl}/nice2/javascript/nice2-react.release.js`)
  await bootstrapWidgets(params)
})()
