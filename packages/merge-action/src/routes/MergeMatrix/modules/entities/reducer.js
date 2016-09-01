import {RETRIEVE_ENTITIES} from './actions'

function receiveEntities(state, {entities}) {
  return [].concat(entities)
}

const ACTION_HANDLERS = {
  [RETRIEVE_ENTITIES]: receiveEntities

}

const initialState = []

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
