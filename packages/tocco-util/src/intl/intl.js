import {updateIntl} from 'react-intl-redux'

export const initIntl = (store, moduleName, locale) => {
  const loadLocale = locale
    ? Promise.resolve(locale)
    : getUserInfo().then(userInfo => Promise.resolve(userInfo.locale))

  return loadLocale.then(locale => setLocale(store, moduleName, locale))
}

export const setLocale = (store, moduleName, locale) => (
  loadTextResources(locale, moduleName)
    .then(textResources => store.dispatch(updateIntl({
      locale: locale.replace('_', '-'),
      messages: textResources
    })))
)

const getUserInfo = () => (
  fetch(`${__BACKEND_URL__}/nice2/username`)
    .then(response => response.json())
)

const loadTextResources = (locale, moduleName) => (
  fetch(`${__BACKEND_URL__}/nice2/textresource?locale=${locale}${moduleName ? `&module=${moduleName}` : ''}`)
    .then(response => response.json())
)
