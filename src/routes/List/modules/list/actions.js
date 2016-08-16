export const REQUEST_ENTITIES = 'REQUEST_ENTITIES'
export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES'

export function requestEntities(entityModel, searchTerm, ordering, timeout = 0) {
  return {
    type: REQUEST_ENTITIES,
    payload: {
      entityModel,
      searchTerm,
      ordering,
      timeout
    }
  }
}

export function receiveEntities(json) {
  return {
    type: RECEIVE_ENTITIES,
    data: json.data
  }
}
