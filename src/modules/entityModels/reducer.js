import * as actions from './actions'

function receiveEntityModels(entityModels, { models }) {
  return Object.keys(models.entities).map(modelName => ({
    name: modelName,
    label: models.entities[modelName].metaData.label
  }))
}

const ACTION_HANDLERS = {
  [actions.RECEIVE_ENTITY_MODELS]: receiveEntityModels
}

const initialState = []

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
