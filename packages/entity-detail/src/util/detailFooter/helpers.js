import modes from '../modes'
import types from './types'

export const getFooterType = (mode, entityModel) => {
  const {useNiceFields} = entityModel

  if (mode === modes.CREATE) {
    return types.NONE
  }

  return useNiceFields ? types.FULL : types.REDUCED
}

const paths = ['create_timestamp', 'update_timestamp', 'create_user', 'update_user', 'version']

export const getFooterPaths = (mode, entityModel) => {
  const type = getFooterType(mode, entityModel)
  const keyField = entityModel.keyField
  switch (type) {
    case types.FULL:
      return [keyField, ...paths]
    case types.REDUCED:
      return [keyField]
    case types.NONE:
    default:
      return []
  }
}
