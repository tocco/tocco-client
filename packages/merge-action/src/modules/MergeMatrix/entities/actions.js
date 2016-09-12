export const RECEIVE_ENTITIES = 'MergeMatrix/RECEIVE_ENTITIES'

export function receiveEntitites(entities) {
  return {
    type: RECEIVE_ENTITIES,
    payload: {
      entities
    }
  }
}
