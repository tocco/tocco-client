import _isObject from 'lodash/isObject'
import moment from 'moment'

const isDefined = v => v !== null && v !== undefined && v !== ''

export const getTql = (path, value, fieldType) => {
  if (!isDefined(value)) {
    return null
  }

  const isRangeValue = value && typeof value === 'object' && value.isRangeValue

  const typeHandler = typeHandlers(fieldType || guessType(value))

  if (isRangeValue) {
    return handleRangeValue(value, typeHandler, path)
  } else {
    return typeHandler(path, value, '==')
  }
}

const handleRangeValue = (value, typeHandler, path) => (
  [
    ...(isDefined(value.from) ? [typeHandler(path, value.from, '>=')] : []),
    ...(isDefined(value.to) ? [typeHandler(path, value.to, '<=')] : [])
  ].join(' and ')
)

const typeHandlers = type => {
  switch (type) {
    case 'multi-select-box':
    case 'multi-remote-field':
      return (path, value) => `KEYS("${path}",${value.map(v => v.key).join(',')})`
    case 'single-remote-field':
    case 'single-select-box':
      return (path, value) => `${path}.pk == ${value.key}`
    case 'fulltext-search':
      return (path, value) => path === 'txtFulltext'
        ? `fulltext("${value}") or fulltext("${value}*")`
        : `fulltext("${value}", ${path}) or fulltext("${value}*", ${path})`
    case 'birthdate':
    case 'date':
    case 'create_timestamp':
      return (path, value, comp) => `${path} ${comp} date:"${value}"`
    case 'datetime':
    case 'createts':
    case 'updatets':
      return (path, value, comp) => `${path} ${comp} datetime:"${moment(value).format('YYYY-MM-DD HH:mm')}"`
    case 'time':
      return (path, value, comp) => `${path} ${comp} time:"${moment(value, 'HH:mm').format('HH:mm:ss.sss')}"`
    case 'string':
      return (path, value, comp) => `${path} ${comp} "${value}"`
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
