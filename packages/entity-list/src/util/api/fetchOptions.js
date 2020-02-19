import _reduce from 'lodash/reduce'

import {getTql} from './tqlBuilder'

const getFilterArray = v =>
  Array.isArray(v) ? v.map(e => e.uniqueId) : [v.uniqueId]

export const getFetchOptionsFromSearchForm = (searchFormValues, formFields = {}) => (
  _reduce(searchFormValues, (acc, value, path) => {
    const addition = {}
    if (path === 'searchFilter') {
      addition.filters = getFilterArray(value)
    } else {
      const fieldType = formFields[path]
      addition.tql = [...(acc.tql ? [acc.tql] : []), getTql(path, value, fieldType)].filter(Boolean).join(' and ')
    }

    return {...acc, ...addition}
  }, {})
)
