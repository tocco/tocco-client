export const REQUEST_ENTITY_MODELS = 'REQUEST_ENTITY_MODELS'
export const RECEIVE_ENTITY_MODELS = 'RECEIVE_ENTITY_MODELS'

export function requestEntityModels() {
  return {
    type: REQUEST_ENTITY_MODELS
  }
}

export function receiveEntityModels(models) {
  return {
    type: RECEIVE_ENTITY_MODELS,
    models
  }
}
