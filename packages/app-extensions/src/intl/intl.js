import {updateIntl} from 'react-intl-redux'
import {request} from 'tocco-util'

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
  cache.clearAll()
  setLocale(store, modules, locale)
}

export const setLocale = async(store, modules, locale) => {
  const textResources = await loadTextResources(locale, modules)

  store.dispatch(updateIntl({
    locale: locale.replace('_', '-'),
    messages: textResources
  }))
}

export const getUserLocale = async() => {
  const cachedUserLocale = cache.getLongTerm('user', 'locale')

  if (cachedUserLocale) {
    return cachedUserLocale
  }

  const locale = await loadUserLocale()
  cache.addLongTerm('user', 'locale', locale)
  return locale
}

export const hasUserLocaleChanged = async() => {
  const cachedUserLocale = cache.getLongTerm('user', 'locale')
  const locale = await loadUserLocale()

  cache.addLongTerm('user', 'locale', locale)
  return !cachedUserLocale || cachedUserLocale !== locale
}

const loadUserLocale = async() => {
  const userInfo = await request.executeRequest('username').then(request.extractBody)
  let {locale, username} = userInfo
  if (username === 'anonymous') {
    locale = getBrowserLocale()
  }
  return locale
}

export const loadTextResources = async(locale, modules) => {
  let result = {}
  const notLoadedModules = []

  modules.forEach(module => {
    const cachedModuleResource = cache.getLongTerm('textResource', module)
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
        .filter(key => key.match(new RegExp('^client\\.' + module + '.*', 'g')))
        .reduce((acc, key) => ({
          ...acc,
          [key]: resources[key]
        }), {})

      cache.addLongTerm('textResource', module, filtered)
      result = {...result, ...filtered}
    })
  }

  return result
}

const fetchTextResources = (locale, modules) => {
  const moduleRegex = `(${modules.join('|')})`
  const moduleParam = moduleRegex ? `&module=${moduleRegex}` : ''
  const url = `textresource?locale=${locale}${moduleParam}`

  return request.executeRequest(url).then(request.extractBody)
}
