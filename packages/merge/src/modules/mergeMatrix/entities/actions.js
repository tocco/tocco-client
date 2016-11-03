export const RECEIVE_ENTITIES = 'MergeMatrix/RECEIVE_ENTITIES'

export const receiveEntities = entities => ({
  type: RECEIVE_ENTITIES,
  payload: {
    entities
  }
})
