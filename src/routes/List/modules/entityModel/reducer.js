import {SET_ENTITY_MODEL} from './actions';

const ACTION_HANDLERS = {
  [SET_ENTITY_MODEL]: (entityModel, { entityModel: newEntityModel }) => newEntityModel
}

const initialState = null

export default function entityModelReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
