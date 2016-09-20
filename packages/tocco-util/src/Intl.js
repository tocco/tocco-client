import {updateIntl} from 'react-intl-redux'

export default class Intl {
  static initIntl(store, moduleName) {
    return Intl.getUserInfo()
      .then(userInfo => Intl.loadTextResources(userInfo.locale, moduleName)
        .then(textResources => store.dispatch(updateIntl(
          {
            locale: userInfo.locale.replace('_', '-'),
            messages: textResources
          }
          ))
        ))
  }

  static getUserInfo() {
    if (__DEV__) {
      console.log('would fetch userinfo')
      return new Promise(resolve => resolve({
        locale: 'de-CH'
      }))
    }
    return fetch(`${__BACKEND_URL__}/nice2/username`)
      .then(response => response.json())
  }

  static loadTextResources(locale, moduleName) {
    if (__DEV__) {
      console.log('would fetch textresources')
      return new Promise(resolve => resolve({
        testKey: 'das ist ein test'
      }))
    }
    return fetch(`${__BACKEND_URL__}/nice2/textresource?locale=${locale}${moduleName ? `&module=${moduleName}` : ''}`)
      .then(response => response.json())
  }
}
