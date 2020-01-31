import {updateIntl} from 'react-intl-redux'

import cache from '../cache'

const supportedLanguage = ['de', 'fr', 'en', 'it']
const FALLBACK_LANGUAGE = 'en'

const getBrowserLocale = () => {
  const browserLocale = window.navigator.userLanguage || window.navigator.language
  const lang = browserLocale.indexOf('-') > 0 ? browserLocale.split('-')[0] : browserLocale
  return supportedLanguage.includes(lang) ? lang : FALLBACK_LANGUAGE
}

export const initIntl = async(store, modules, forcedLocale) => {
  let locale = forcedLocale
  if (!locale) {
    locale = await getUserLocale()
  }
  return setLocale(store, modules, locale)
}

export const changeLocale = async(store, modules, locale) => {
  cache.clear()
  setLocale(store, modules, locale)
}

export const setLocale = async(store, modules, locale) => {
  const textResources = await loadTextResources(locale, modules)

  store.dispatch(updateIntl({
    locale: locale.replace('_', '-'),
    messages: textResources
  }))
}

const fetchOptions = {
  method: 'GET',
  headers: new Headers({
    'Content-Type': 'application/json'
  }),
  credentials: 'include'
}

export const getUserLocale = async() => {
  const cachedUserLocale = cache.get('user', 'locale')

  if (cachedUserLocale) {
    return cachedUserLocale
  }

  const response = await fetch(`${__BACKEND_URL__}/nice2/username`, fetchOptions)
  const userInfo = await response.json()
  let {locale, username} = userInfo
  if (username === 'anonymous') {
    locale = getBrowserLocale()
  }
  cache.add('user', 'locale', locale)
  return locale
}

export const loadTextResources = async(locale, modules) => {
  let result = {}
  const notLoadedModules = []

  modules.forEach(module => {
    const cachedModuleResource = cache.get('textResource', module)
    if (cachedModuleResource) {
      result = {...result, ...cachedModuleResource}
    } else {
      notLoadedModules.push(module)
    }
  })

  if (notLoadedModules.length > 0) {
    const resources = await fetchTextResources(locale, notLoadedModules)

    notLoadedModules.forEach(module => {
      const filtered = Object.keys(resources)
        .filter(key => key.includes(module))
        .reduce((obj, key) => {
          obj[key] = resources[key]
          return obj
        }, {})

      cache.add('textResource', module, filtered)
      result = {...result, ...filtered}
    })
  }

  return result
}

const fetchTextResources = async(locale, modules) => {
  const moduleRegex = `(${modules.join('|')})`
  const moduleParam = moduleRegex ? `&module=${moduleRegex}` : ''
  const url = `${__BACKEND_URL__}/nice2/textresource?locale=${locale}${moduleParam}`

  const response = await fetch(url, fetchOptions)
  return response.json()
}
