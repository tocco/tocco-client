import _reduce from 'lodash/reduce'
import _get from 'lodash/get'

export const transformProviderEntities = response =>
  response.data.map(provider => _reduce(provider.paths, (result, value, key) => {
    return {...result, [key]: _get(value, 'value.value', null)}
  }, {})
  )
