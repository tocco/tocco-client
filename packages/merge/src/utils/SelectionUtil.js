export const isToManySelected = (toManySelections, relationName, toManyPk, entityPk) => {
  var toManyRelationSelection = toManySelections[relationName]
  if (!toManyRelationSelection) return false

  var entitySelection = toManyRelationSelection[entityPk]
  if (!entitySelection) return false

  return (entitySelection.indexOf(toManyPk) >= 0)
}

