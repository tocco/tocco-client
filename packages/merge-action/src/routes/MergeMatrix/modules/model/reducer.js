import {RETRIEVE_MODEL} from './actions'

function receiveEntities(state, {model}) {
  return model
}

const ACTION_HANDLERS = {
  [RETRIEVE_MODEL]: receiveEntities

}

const initialState = []

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
