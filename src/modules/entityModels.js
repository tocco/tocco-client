import fetch from 'isomorphic-fetch'

export const REQUEST_ENTITY_MODELS = 'REQUEST_ENTITY_MODELS'
export const RECEIVE_ENTITY_MODELS = 'RECEIVE_ENTITY_MODELS'

function requestEntityModels() {
  return {
    type: REQUEST_ENTITY_MODELS
  }
}

function receiveEntityModels(json) {
  return {
    type: RECEIVE_ENTITY_MODELS,
    models: json,
    receivedAt: Date.now()
  }
}

export function fetchEntityModels() {
  return (dispatch, getState) => {
    if (getState().entityModels.length > 0) {
      return null
    }
    dispatch(requestEntityModels())
    return fetch(`${__BACKEND_URL__}/nice2/rest/entities`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => dispatch(receiveEntityModels(json)))
  }
}

const ACTION_HANDLERS = {
  [RECEIVE_ENTITY_MODELS]: (entityModels, { models }) =>
    Object.keys(models.entities).map(modelName => ({
      name: modelName,
      label: models.entities[modelName].metaData.label
    }))
}

const initialState = []

export default function entityModelsReducer(state = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
