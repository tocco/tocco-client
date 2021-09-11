export const RECEIVE_ENTRY = 'sqllog/RECEIVE_ENTRY'
export const SET_ACTIVE = 'sqllog/SET_ACTIVE'
export const SET_ELAPSED = 'sqllog/SET_ELAPSED'

export const receiveEntry = data => ({
  type: RECEIVE_ENTRY,
  payload: {
    data
  }
})

export const setActive = active => ({
  type: SET_ACTIVE,
  payload: {
    active
  }
})

export const setElapsed = elapsed => ({
  type: SET_ELAPSED,
  payload: {
    elapsed
  }
})
