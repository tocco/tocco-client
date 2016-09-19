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
    return fetch(`${__BACKEND_URL__}/nice2/username`)
      .then(response => response.json())
  }

  static loadTextResources(locale, moduleName) {
    return fetch(`${__BACKEND_URL__}/nice2/textresource?locale=${locale}${moduleName ? `&module=${moduleName}` : ''}`)
      .then(response => response.json())
  }
}
