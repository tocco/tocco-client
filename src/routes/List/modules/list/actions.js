export const REQUEST_ENTITIES = 'REQUEST_ENTITIES'
export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES'
export const CLEAR_ENTITY_LIST = 'CLEAR_ENTITY_LIST'

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
