export const RETRIEVE_ENTITIES = 'MergeMatrix/RETRIEVE_ENTITIES'

export function retrieveEntities(entities) {
  return {
    type: RETRIEVE_ENTITIES,
    entities
  }
}
