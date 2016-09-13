import {RECEIVE_ENTITIES} from './actions'

function receiveEntities(state, {payload}) {
  return [].concat(payload.entities)
}

const ACTION_HANDLERS = {
  [RECEIVE_ENTITIES]: receiveEntities

}

const initialState = []

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
