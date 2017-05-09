import _forOwn from 'lodash/forOwn'
import _isObject from 'lodash/isObject'

export const getSearchInputsForRequest = searchInputs => {
  let result = {}

  _forOwn(searchInputs, (value, name) => {
    if (Array.isArray(value)) {
      result[`${name}.pk`] = value.map(v => v.key)
    } else if (_isObject(value)) {
      result[`${name}.pk`] = value.key
    } else {
      result[name] = value
    }
  }
  )

  return result
}
