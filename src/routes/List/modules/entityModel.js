export const SET_ENTITY_MODEL = 'SET_ENTITY_MODEL'

export function setEntityModel(entityModel) {
  return {
    type: SET_ENTITY_MODEL,
    entityModel
  }
}

const ACTION_HANDLERS = {
  [SET_ENTITY_MODEL]: (entityModel, { entityModel: newEntityModel }) => newEntityModel
}

const initialState = 'Event'

export default function entityModelReducer(state = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
