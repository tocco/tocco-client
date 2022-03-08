export const EMIT_ACTION = 'EMIT_ACTION'
export const DISPATCH_EMITTED_ACTION = 'DISPATCH_EMITTED_ACTION'

export const emitAction = action => ({
  type: EMIT_ACTION,
  payload: {
    action
  }
})

export const dispatchEmittedAction = action => ({
  type: DISPATCH_EMITTED_ACTION,
  payload: {
    action
  }
})
