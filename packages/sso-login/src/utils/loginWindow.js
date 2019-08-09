import {getPopUpFeatures} from './popUp'

export const openLoginWindow = (loginEndpoint, loginCompleted, provider) => {
  const baseUrl = __DEV__ ? '' : __BACKEND_URL__
  const encodedWindowUrl = encodeURIComponent(window.location.href)
  const url = `${baseUrl}${loginEndpoint}?provider=${provider.unique_id}&sourceUri=${encodedWindowUrl}`

  const popUp = window.open(url, provider.label, getPopUpFeatures(650, 500))

  window.ssoPopUpCallback = result => {
    popUp.close()
    loginCompleted(result)
  }
}
