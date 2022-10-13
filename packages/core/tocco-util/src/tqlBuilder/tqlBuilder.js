import {addDays} from 'date-fns'
import _isObject from 'lodash/isObject'

import {parseInLocalTime, parseTime, formatTQLDatetime, formatTQLTime, parseAsStartOfDayInLocalTime} from './utils'

const isDefined = v => v !== null && v !== undefined && v !== ''

export const getTql = (path, value, fieldType) => {
  if (!isDefined(value)) {
    return null
  }

  const type = fieldType || guessType(value)
  value = rangeMappings(type)(value)

  const isRangeValue = value && typeof value === 'object' && value.isRangeValue
  const typeHandler = typeHandlers(type)

  if (isRangeValue) {
    return handleRangeValue(value, typeHandler, path)
  } else {
    return typeHandler(path, value, '==')
  }
}

const handleRangeValue = (value, typeHandler, path) =>
  [
    ...(isDefined(value.from) ? [typeHandler(path, value.from, '>=')] : []),
    ...(isDefined(value.to) ? [typeHandler(path, value.to, value.exclusive ? '<' : '<=')] : [])
  ].join(' and ')

const rangeMappings = type => {
  switch (type) {
    case 'datetime':
    case 'createts':
    case 'updatets':
      return value => {
        const date = parseAsStartOfDayInLocalTime(value)
        if (!isNaN(date)) {
          return {
            from: date.toISOString(),
            to: addDays(date, 1).toISOString(),
            isRangeValue: true,
            exclusive: true
          }
        } else {
          return value
        }
      }
    default:
      return value => value
  }
}

const escapeFulltextValue = value => value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')

const typeHandlers = type => {
  switch (type) {
    case 'multi-select-box':
    case 'multi-remote-field':
      return (path, value) => `KEYS("${path}",${value.map(v => v.key).join(',')})`
    case 'single-remote-field':
    case 'single-select-box':
      return (path, value) => `${path}.pk == ${value.key}`
    case 'fulltext-search':
      return (path, value) => {
        const escapedValue = escapeFulltextValue(value)
        return path === 'txtFulltext'
          ? `fulltext("(${escapedValue}) OR (${escapedValue}*)")`
          : `fulltext("(${escapedValue}) OR (${escapedValue}*)", ${path})`
      }
    case 'birthdate':
    case 'date':
    case 'create_timestamp':
      return (path, value, comp) => `${path} ${comp} date:"${value}"`
    case 'datetime':
    case 'createts':
    case 'updatets':
      return (path, value, comp) => `${path} ${comp} datetime:"${formatTQLDatetime(parseInLocalTime(value))}"`
    case 'time':
      return (path, value, comp) => `${path} ${comp} time:"${formatTQLTime(parseTime(value))}"`
    case 'compressed-text':
    case 'string':
    case 'text':
    case 'createuser':
    case 'updateuser':
    case 'login':
      return (path, value) => `${path} ~= "*${value}*"`
    case 'boolean':
      return (path, value) => (isDefined(value) ? `${path} == ${value}` : null)
    case 'marking':
      return (path, value) => (value === false ? `not exists(${path})` : `exists(${path})`)
    default:
      return (path, value, comp) => `${path} ${comp} ${value}`
  }
}

// For fields that are not in the search form (e.g. parent and preselectedSearchFields)
const guessType = value => {
  if (_isObject(value) && value.key) {
    return 'single-select-box'
  }

  if (Array.isArray(value) && value.every(v => !!v.key)) {
    return 'multi-select-box'
  }

  return 'string'
}
