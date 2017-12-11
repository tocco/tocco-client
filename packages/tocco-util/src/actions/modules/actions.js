export const ACTION_INVOKE = 'actions/ACTION_INVOKE'
export const ACTION_IN_PROGRESS = 'actions/ACTION_IN_PROGRESS'
export const ACTION_INVOKED = 'actions/ACTION_INVOKE'

export const actionInvoke = (definition, entity, ids) => ({
  type: ACTION_INVOKE,
  payload: {
    definition,
    entity,
    ids
  }
})
