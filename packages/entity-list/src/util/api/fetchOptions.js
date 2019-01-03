import _reduce from 'lodash/reduce'
import _isObject from 'lodash/isObject'

const getFilterArray = v =>
  Array.isArray(v) ? v.map(e => e.uniqueId) : [v.uniqueId]

// For fields that are not in the search form (e.g. parent and preselectedSearchFields)
const objectTransformFallback = (value, key) => {
  if (Array.isArray(value)) {
    return {[`${key}.pk`]: value.map(v => ({value: v.key}))}
  } else if (_isObject(value)) {
    return {[`${key}.pk`]: {value: value.key}}
  }

  return null
}

const transformSearchValue = (value, key, formFields) => {
  if (value === null || value === undefined) {
    return {}
  }

  const fieldType = formFields[key]
  if (fieldType) {
    if (fieldType === 'multi-select-box' || fieldType === 'multi-remote-field') {
      value = Array.isArray(value) ? value : [value]
      return {[`${key}.pk`]: value.map(v => ({value: v.key}))}
    }

    if (fieldType === 'single-select-box' || fieldType === 'single-remote-field') {
      return {[`${key}.pk`]: {value: value.key}}
    }
  } else {
    const objectBased = objectTransformFallback(value, key)
    if (objectBased) return objectBased
  }

  return {[key]: {value}}
}

export const getFetchOptionsFromSearchForm = (searchFormValues, formFields = {}) => (
  _reduce(searchFormValues, (result, value, key) => {
    const addition = {}
    if (key === 'searchFilter') {
      addition.filters = getFilterArray(value)
    } else if (key === 'txtFulltext') {
      addition.search = value
    } else {
      addition.conditions = {
        ...result.conditions,
        ...transformSearchValue(value, key, formFields)
      }
    }

    return {...result, ...addition}
  }, {})
)
