import _isEqual from 'lodash/isEqual'
import _transform from 'lodash/transform'

const isObject = v => typeof v === 'object' && v !== null

export const difference = (object, base) =>
  _transform(object, (result, value, key) => {
    if (!_isEqual(value, base[key])) {
      result[key] = isObject(value) && isObject(base[key]) ? difference(value, base[key]) : value
    }
  })
