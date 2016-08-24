export const REQUEST_ENTITIES = 'List/REQUEST_ENTITIES'
export const RECEIVE_ENTITIES = 'List/RECEIVE_ENTITIES'
export const RECEIVE_LAZYLOADED_ENTITIES = 'List/RECEIVE_LAZYLOADED_ENTITIES'
export const CLEAR_ENTITY_LIST = 'List/CLEAR_ENTITY_LIST'
export const LAZY_LOAD = 'List/LAZY_LOAD'

export function requestEntities() {
  return {
    type: REQUEST_ENTITIES
  }
}

export function clearEntityList() {
  return {
    type: CLEAR_ENTITY_LIST
  }
}

export function receiveEntities(json) {
  return {
    type: RECEIVE_ENTITIES,
    data: json.data
  }
}

export function receiveLazyLoadedEntities(json) {
  return {
    type: RECEIVE_LAZYLOADED_ENTITIES,
    data: json.data
  }
}

export function lazyLoading() {
  return {
    type: LAZY_LOAD
  }
}
