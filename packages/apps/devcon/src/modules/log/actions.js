export const RECEIVE_ENTRY = 'log/RECEIVE_ENTRY'

export const receiveEntry = data => ({
  type: RECEIVE_ENTRY,
  payload: {
    data
  }
})
