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

const fetchOptions = {
  method: 'GET',
  headers: new Headers({
    'Content-Type': 'application/json'
  }),
  credentials: 'include'
}

const getUserInfo = () => (
  fetch(`${__BACKEND_URL__}/nice2/username`, fetchOptions)
    .then(response => response.json())
)

const loadTextResources = (locale, moduleName) => {
  const moduleParam = moduleName ? `&module=${moduleName}` : ''
  const url = `${__BACKEND_URL__}/nice2/textresource?locale=${locale}${moduleParam}`
  return fetch(url, fetchOptions)
    .then(response => response.json())
}
