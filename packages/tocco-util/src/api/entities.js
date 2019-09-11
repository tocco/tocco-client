import _pick from 'lodash/pick'
import _get from 'lodash/get'

const relevantRelationAttributes = ['key', 'display', 'model']
export const typeValueExtractor = {
  'display-expression': value => value,
  'entity': value => value ? _pick(value, relevantRelationAttributes) : null,
  'entity-list': value => value.length > 0
    ? value.map(childValue => _pick(childValue, relevantRelationAttributes)) : null,
  'multi': value => value.length > 0
    ? {multi: true, values: value.map(childValue => typeValueExtractor[childValue.type](childValue.value))} : null,
  'field': value => {
    if (value.value === null) {
      return null
    }

    switch (value.type) {
      case 'login':
        return _get(value, 'value.username')
      case 'longitude':
      case 'latitude':
        return _get(value, 'value.value')
      default:
        return value.value
    }
  }
}
