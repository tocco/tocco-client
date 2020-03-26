import _reduce from 'lodash/reduce'
import {tqlBuilder} from 'tocco-util'

const getFilterArray = v =>
  Array.isArray(v) ? v.map(e => e.uniqueId) : [v.uniqueId]

export const getFetchOptionsFromSearchForm = (searchFormValues, formFields = {}) => (
  _reduce(searchFormValues, (acc, value, path) => {
    const addition = {}
    if (path === 'searchFilter') {
      addition.filters = getFilterArray(value)
    } else {
      const fieldType = formFields[path]
      const tql = tqlBuilder.getTql(path, value, fieldType)
      addition.tql = [...(acc.tql ? [acc.tql] : []), tql].filter(Boolean).join(' and ')
    }

    return {...acc, ...addition}
  }, {})
)
