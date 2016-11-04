export const isToManySelected = (toManySelections, relationName, toManyPk, entityPk) => {
  const toManyRelationSelection = toManySelections[relationName]
  if (!toManyRelationSelection) return false

  const entitySelection = toManyRelationSelection[entityPk]
  if (!entitySelection) return false

  return (entitySelection.indexOf(toManyPk) >= 0)
}

