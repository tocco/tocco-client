export const ACTION_INVOKE = 'actions/ACTION_INVOKE'
export const ACTION_IN_PROGRESS = 'actions/ACTION_IN_PROGRESS'
export const ACTION_INVOKED = 'actions/ACTION_INVOKED'

export const actionInvoke = (definition, selection, parent) => ({
  type: ACTION_INVOKE,
  payload: {
    definition,
    selection,
    parent
  }
})

export const actionInvoked = (definition, selection, response) => ({
  type: ACTION_INVOKED,
  payload: {
    definition,
    selection,
    response
  }
})
