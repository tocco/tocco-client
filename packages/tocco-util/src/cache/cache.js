export const add = (type, id, value) => {
  const key = `cache.${type}.${id}`
  return sessionStorage.setItem(key, JSON.stringify(value))
}

export const get = (type, id) => {
  const key = `cache.${type}.${id}`
  return JSON.parse(sessionStorage.getItem(key))
}
