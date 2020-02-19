import _isObject from 'lodash/isObject'
import moment from 'moment'

export const getTql = (path, value, fieldType) => {
  if (value === null || value === undefined || value === '') {
    return null
  }

  return typeHandlers(fieldType || guessType(value))(path, value)
}

const typeHandlers = type => {
  switch (type) {
    case 'multi-select-box':
    case 'multi-remote-field':
      return (path, value) => `IN(${path}.pk,${value.map(v => v.key).join(',')})`
    case 'single-remote-field':
    case 'single-select-box':
      return (path, value) => `${path}.pk == ${value.key}`
    case 'fulltext-search':
      return (path, value) => path === 'txtFulltext' ? `fulltext("${value}")` : `fulltext("${value}",${path})`
    case 'birthdate':
    case 'date':
    case 'create_timestamp':
      return (path, value) => `${path} == date:"${value}"`
    case 'datetime':
    case 'createts':
    case 'updatets':
      return (path, value) => `${path} == datetime:"${moment(value).format('YYYY-MM-DD HH:mm')}"`
    case 'string':
      return (path, value) => `${path} == "${value}"`
    default:
      return (path, value) => `${path} == ${value}`
  }
}

// For fields that are not in the search form (e.g. parent and preselectedSearchFields)
const guessType = value => {
  if (_isObject(value)) {
    if (value.key) {
      return 'single-select-box'
    }
  }

  if (Array.isArray(value)) {
    if (value.every(v => !!v.key)) {
      return 'multi-select-box'
    }
  }

  return 'string'
}
