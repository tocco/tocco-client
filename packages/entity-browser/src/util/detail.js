const modes = {
  CREATE: 'create',
  UPDATE: 'update'
}

export const getMode = entityId => (entityId === undefined) ? modes.CREATE : modes.UPDATE

export default {
  modes,
  getMode
}
