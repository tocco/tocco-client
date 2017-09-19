const modes = {
  CREATE: 'create',
  UPDATE: 'update'
}

export const getMode = entityId => (entityId === undefined) ? modes.CREATE : modes.UPDATE

export const getFormExtension = mode => (mode === modes.CREATE) ? '_create' : '_detail'

export default {
  modes,
  getMode,
  getFormExtension
}
