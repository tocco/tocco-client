import {RECEIVE_ENTITIES, RECEIVE_LAZYLOADED_ENTITIES, CLEAR_ENTITY_LIST} from './actions'
import {INIT_LIST} from '../actions'

function receiveEntities(state, {data}) {
  return [].concat(data)
}

function receiveLazyLoadedEntities(state, {data}) {
  return [].concat(state).concat(data)
}

function clearEntityList() {
  return []
}

const ACTION_HANDLERS = {
  [RECEIVE_ENTITIES]: receiveEntities,
  [RECEIVE_LAZYLOADED_ENTITIES]: receiveLazyLoadedEntities,
  [CLEAR_ENTITY_LIST]: clearEntityList,
  [INIT_LIST]: clearEntityList
}

const initialState = []

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
