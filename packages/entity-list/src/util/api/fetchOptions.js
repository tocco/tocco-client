import _reduce from 'lodash/reduce'

const getFilterArray = v =>
  Array.isArray(v) ? v.map(e => e.uniqueId) : [v.uniqueId]

const transformSearchValue = (value, key, formFields) => {
  const fieldType = formFields[key]
  if (fieldType) {
    if (fieldType === 'multi-select-box' || fieldType === 'multi-remote-field') {
      value = Array.isArray(value) ? value : [value]
      return {[`${key}.pk`]: value.map(v => ({value: v.key}))}
    }

    if (fieldType === 'single-select-box' || fieldType === 'single-remote-field') {
      return {[`${key}.pk`]: {value: value.key}}
    }
  }

  return {[key]: {value}}
}

export const getFetchOptionsFromSearchForm = (searchFormValues, formFields = {}) => {
  return _reduce(searchFormValues, (result, value, key) => {
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
}
