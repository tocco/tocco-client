import _transform from 'lodash/transform'
import _isEqual from 'lodash/isEqual'
import _isObject from 'lodash/isObject'

export const difference = (object, base) => {
  const changes = (object, base) =>
    _transform(object, (result, value, key) => {
      if (!_isEqual(value, base[key])) {
        result[key] = (_isObject(value) && _isObject(base[key])) ? changes(value, base[key]) : value
      }
    })

  return changes(object, base)
}
