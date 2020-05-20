import nice from '../nice'

export const add = (type, id, value) => {
  if (__DEV__ || nice.getRunEnv() !== 'PRODUCTION') {
    return null
  }

  const key = `cache.${type}.${id}`
  return sessionStorage.setItem(key, JSON.stringify(value))
}

export const get = (type, id) => {
  const key = `cache.${type}.${id}`
  const cachedValue = sessionStorage.getItem(key)

  if (!cachedValue) {
    return undefined
  }

  return JSON.parse(cachedValue)
}

export const clear = () => {
  sessionStorage.clear()
}
