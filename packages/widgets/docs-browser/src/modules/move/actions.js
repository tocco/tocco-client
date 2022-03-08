export const INITIALIZE = 'docs/move/INITIALIZE'
export const INVALID_SELECTION = 'docs/move/INVALID_SELECTION'
export const MOVE_ELEMENTS = 'docs/move/MOVE_ELEMENTS'
export const SET_WAITING = 'docs/move/SET_WAITING'
export const SET_DONE = 'docs/move/SET_DONE'
export const CLOSE = 'docs/move/CLOSE'

export const initialize = (selection, onSuccess, onError) => ({
  type: INITIALIZE,
  payload: {
    selection,
    onSuccess,
    onError
  }
})

export const invalidSelection = () => ({
  type: INVALID_SELECTION
})

export const moveElements = (target, selected) => ({
  type: MOVE_ELEMENTS,
  payload: {
    target,
    selected
  }
})

export const setWaiting = (isWaiting = true) => ({
  type: SET_WAITING,
  payload: {
    isWaiting
  }
})

export const close = () => ({
  type: CLOSE
})
