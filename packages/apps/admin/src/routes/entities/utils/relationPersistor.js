const selectedRelations = {}

export const getRelation = entity => selectedRelations[entity]

export const setRelation = (entity, selectedRelation) => {
  selectedRelations[entity] = selectedRelation
}
