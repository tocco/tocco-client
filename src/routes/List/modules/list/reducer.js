import * as actions from './actions'

function receiveEntities(state, { data }) {
  return [].concat(state).concat(data)
}


function clearEntityList() {
  return []
}

const ACTION_HANDLERS = {
  [actions.RECEIVE_ENTITIES]: receiveEntities,
  [actions.CLEAR_ENTITY_LIST]: clearEntityList
}

const initialState = []

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
