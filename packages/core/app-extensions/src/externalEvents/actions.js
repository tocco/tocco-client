export const FIRE_EXTERNAL_EVENT = 'externalEvents/FIRE_EXTERNAL_EVENT'
export const FIRE_STATE_CHANGE_EVENT = 'externalEvents/FIRE_STATE_CHANGE_EVENT'

export const fireExternalEvent = (name, payload) => ({
  type: FIRE_EXTERNAL_EVENT,
  payload: {
    name,
    payload
  }
})

export const fireStateChangeEvent = states => ({
  type: FIRE_STATE_CHANGE_EVENT,
  payload: {
    states
  }
})
