import _reduce from 'lodash/reduce'

const getFilterArray = v =>
  Array.isArray(v) ? v.map(e => e.uniqueId) : [v.uniqueId]

const transformSearchValue = (value, key, entityModel) => {
  const fieldModel = entityModel[key]

  if (fieldModel) {
    if (fieldModel.type === 'relation' && fieldModel.multi) {
      return {[`${key}.pk`]: value.map(v => ({value: v.key}))}
    }

    if (fieldModel.type === 'relation' && !fieldModel.multi) {
      return {[`${key}.pk`]: {value: value.key}}
    }
  }

  return {[key]: {value}}
}

export const getFetchOptionsFromSearchForm = (searchFormValues, entityModel = {}) => {
  return _reduce(searchFormValues, (result, value, key) => {
    const addition = {}
    if (key === 'searchFilter') {
      addition.filters = getFilterArray(value)
    } else if (key === 'txtFulltext') {
      addition.search = value
    } else {
      addition.conditions = {
        ...result.conditions,
        ...transformSearchValue(value, key, entityModel)
      }
    }

    return {...result, ...addition}
  }, {})
}
