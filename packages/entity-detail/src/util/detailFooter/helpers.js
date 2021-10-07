import modes from '../modes'
import types from './types'

export const getFooterType = (mode, entityModel) => {
  const {useNiceFields} = entityModel

  if (mode === modes.CREATE) {
    return types.NONE
  }

  return useNiceFields ? types.FULL : types.REDUCED
}

const paths = ['pk', 'create_timestamp', 'update_timestamp', 'create_user', 'update_user', 'version']

export const getFooterPaths = (mode, entityModel) => {
  const type = getFooterType(mode, entityModel)
  switch (type) {
    case types.FULL:
      return paths
    case types.REDUCED:
      return ['pk']
    case types.NONE:
    default:
      return []
  }
}
