import {updateIntl} from 'react-intl-redux'

export default class Intl {

  static initIntl(store, moduleName, locale) {
    const loadLocale = locale
      ? Promise.resolve(locale)
      : Intl.getUserInfo().then(userInfo => Promise.resolve(userInfo.locale))
    return loadLocale.then(locale => Intl.setLocale(store, moduleName, locale))
  }

  static setLocale(store, moduleName, locale) {
    return Intl.loadTextResources(locale, moduleName)
      .then(textResources => store.dispatch(updateIntl({
        locale: locale.replace('_', '-'),
        messages: textResources
      })))
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
      const testResources = {
        'de-CH': {
          testKey: 'das ist ein test'
        },
        en: {
          testKey: 'this is a test'
        }
      }
      return new Promise(resolve => resolve(testResources[locale]))
    }
    return fetch(`${__BACKEND_URL__}/nice2/textresource?locale=${locale}${moduleName ? `&module=${moduleName}` : ''}`)
      .then(response => response.json())
  }
}
