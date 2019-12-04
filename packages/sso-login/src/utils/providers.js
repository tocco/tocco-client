import _reduce from 'lodash/reduce'

export const transformProviderEntities = response =>
  response.data.map(provider => _reduce(provider.paths, (result, value, key) => {
    return {...result, [key]: value.value}
  }, {})
  )
