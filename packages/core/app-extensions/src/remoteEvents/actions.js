export const REMOTE_EVENT = 'remoteEvents/REMOTE_EVENT'

export const remoteEvent = event => ({
  type: REMOTE_EVENT,
  payload: {
    event
  }
})
