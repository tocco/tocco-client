import {addLocaleData} from 'react-intl'
import {updateIntl} from 'react-intl-redux'

import de from 'react-intl/locale-data/de'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import it from 'react-intl/locale-data/it'

addLocaleData([...de, ...en, ...fr, ...it])

export default function initIntl(store, moduleName) {
  return getUserInfo()
    .then(userInfo => loadTextResources(userInfo.locale, moduleName)
      .then(textResources => store.dispatch(updateIntl({
        locale: userInfo.locale.replace('_', '-'),
        messages: textResources
      }))
    ))
}

export function getUserInfo() {
  if (__DEV__){
    return Promise.resolve({locale: 'de_CH'})
  }
  return fetch(`${__BACKEND_URL__}/nice2/username`)
    .then(response => response.json())
}

export function loadTextResources(locale, moduleName) {
  if (__DEV__){
    return Promise.resolve({})
  }
  return fetch(`${__BACKEND_URL__}/nice2/textresource?locale=${locale}${moduleName ? `&module=${moduleName}` : ''}`)
    .then(response => response.json())
}
