import queryStringUtil from 'query-string'
import _isObject from 'lodash/isObject'
import _mapValues from 'lodash/mapValues'

/**
 * Build query string from params map object.
 *
 * Note: object values will be JSON-stringified
 *
 * @param obj The params map.
 * @returns the params map as query string.
 */
export const toQueryString = obj => {
  const stringifiedValues = _mapValues(obj, value => _isObject(value) ? JSON.stringify(value) : value)
  return queryStringUtil.stringify(stringifiedValues)
}

/**
 * Get params map object from query string.
 *
 * Note: param values that represent a JSON string will be parsed and returned as object.
 *
 * @param queryString The query string to parse.
 * @returns the query string as parsed object.
 */
export const fromQueryString = queryString => {
  const obj = queryStringUtil.parse(queryString)
  return _mapValues(obj, value => hasJsonStructure(value) ? JSON.parse(value) : value)
}

export const hasJsonStructure = str => {
  if (typeof str !== 'string') {
    return false
  }
  try {
    const parsed = JSON.parse(str)
    const type = Object.prototype.toString.call(parsed)
    return type === '[object Object]'
  } catch (err) {
    return false
  }
}
