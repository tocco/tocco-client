import _transform from 'lodash/transform'
import _isEqual from 'lodash/isEqual'

const isObject = v =>
  typeof v === 'object' && v !== null

export const difference = (object, base) => {
  const changes = (object, base) =>
    _transform(object, (result, value, key) => {
      if (!_isEqual(value, base[key])) {
        result[key] = (isObject(value) && isObject(base[key])) ? changes(value, base[key]) : value
      }
    })

  return changes(object, base)
}
