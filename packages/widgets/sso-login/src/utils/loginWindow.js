import {env} from 'tocco-util'

import {getPopUpFeatures} from './popUp'

export const openLoginWindow = (loginEndpoint, loginCompleted, provider) => {
  const isWidget = env.getEmbedType() === 'widget'

  const baseUrl = __DEV__ ? '' : env.getBackendUrl()

  const redirectUri = encodeURIComponent(`${baseUrl}/nice2/sso-callback`)
  const sourceUri = encodeURIComponent(window.location.href)

  const providerParam = `provider=${provider.unique_id}`
  const sourceUriParam = `&sourceUri=${sourceUri}`
  // apply nice_auth cookie on customers extranet domain instead of tocco.ch-domain
  const redirectUriParam = isWidget ? `&redirectUri=${redirectUri}` : ''

  const url = `${baseUrl}${loginEndpoint}?${providerParam}${sourceUriParam}${redirectUriParam}`

  const popUp = window.open(url, provider.label, getPopUpFeatures(650, 500))

  window.ssoPopUpCallback = result => {
    popUp.close()
    loginCompleted(result)
  }
}
