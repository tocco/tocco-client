import * as actions from './actions'

function receiveEntities(state, { data }) {
  return [].concat(data)
}

const ACTION_HANDLERS = {
  [actions.RECEIVE_ENTITIES]: receiveEntities
}

const initialState = []

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
