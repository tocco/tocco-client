import _get from 'lodash/get'
import _set from 'lodash/set'
import _unset from 'lodash/unset'

import nice from '../nice'

/*
 * Object cache is per browser tab, but clears on reload.
 * Short term caching (sessionStorage) is per browser tab.
 * Long term cache (localStorage) is shared across tabs and browser sessions.
 *
 * short term / object cache gets cleared
 *  - individually (e.g. displays on change entity)
 *  - whenever overall cache gets cleared
 *
 * overall cache gets cleared
 *  - language change
 *  - user change
 *  - business unit change
 *  - revision change
 */

const prefix = `tocco.cache`
const getKey = (type, id) => `${prefix}.${type}.${id}`

const objectCache = {}

const objectWriter = (key, value) => _set(objectCache, key, value)
const storageWriter = storage => (key, value) => storage.setItem(key, JSON.stringify(value))

export const addObjectCache = (type, id, value) => add(type, id, value, objectWriter)
export const addShortTerm = (type, id, value) => add(type, id, value, storageWriter(sessionStorage))
export const addLongTerm = (type, id, value) => add(type, id, value, storageWriter(localStorage))

const add = (type, id, value, write) => {
  if (__DEV__ || nice.getRunEnv() !== 'PRODUCTION') {
    return null
  }

  return write(getKey(type, id), value)
}

export const getObjectCache = (type, id) => _get(objectCache, getKey(type, id))
export const getShortTerm = (type, id) => getFromStorage(type, id, sessionStorage)
export const getLongTerm = (type, id) => getFromStorage(type, id, localStorage)

const getFromStorage = (type, id, storage) => {
  const cachedValue = storage.getItem(getKey(type, id))

  if (!cachedValue) {
    return undefined
  }

  return JSON.parse(cachedValue)
}

export const removeObjectCache = (type, id) => _unset(objectCache, getKey(type, id))
export const removeShortTerm = (type, id) => removeFromStorage(type, id, sessionStorage)
export const removeLongTerm = (type, id) => removeFromStorage(type, id, localStorage)
const removeFromStorage = (type, id, storage) => storage.removeItem(getKey(type, id))

export const clearAll = () => {
  clearObjectCache()
  clearShortTerm()
  clearLongTerm()
}

export const clearObjectCache = () => Object.keys(objectCache).forEach(key => _unset(objectCache, key))
export const clearShortTerm = () => clearStorage(sessionStorage)
export const clearLongTerm = () => clearStorage(localStorage)
const clearStorage = storage => {
  const keys = Object.keys(storage)
  keys.filter(key => key.startsWith(prefix)).forEach(key => storage.removeItem(key))
}
