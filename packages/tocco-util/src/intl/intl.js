import {updateIntl} from 'react-intl-redux'

export const initIntl = (store, modules, locale) => {
  const loadLocale = locale
    ? Promise.resolve(locale)
    : getUserInfo().then(userInfo => Promise.resolve(userInfo.locale))

  return loadLocale.then(locale => setLocale(store, modules, locale))
}

export const setLocale = (store, modules, locale) => (
  loadTextResources(locale, modules)
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

const loadTextResources = (locale, modules) => {
  const moduleRegex = `(${modules.join('|')})`
  const moduleParam = moduleRegex ? `&module=${moduleRegex}` : ''
  const url = `${__BACKEND_URL__}/nice2/textresource?locale=${locale}${moduleParam}`

  return fetch(url, fetchOptions)
    .then(response => response.json())
}
