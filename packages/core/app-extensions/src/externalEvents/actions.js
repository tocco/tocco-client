export const FIRE_EXTERNAL_EVENT = 'externalEvents/FIRE_EXTERNAL_EVENT'

export const fireExternalEvent = (name, payload) => ({
  type: FIRE_EXTERNAL_EVENT,
  payload: {
    name,
    payload
  }
})
