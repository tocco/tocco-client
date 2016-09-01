export const SELECT_SOURCE_FIELD = 'MergeMatrix/SELECT_SOURCE_FIELD'
export const SELECT_SOURCE_RELATION = 'MergeMatrix/SELECT_SOURCE_RELATION'
export const TOGGLE_RELATION_MANY = 'MergeMatrix/TOGGLE_RELATION_MANY'

export function selectSourceField(field, entityPk) {
  return {
    type: SELECT_SOURCE_FIELD,
    entityPk,
    field
  }
}

export function selectSourceRelation(relationName, entityPk) {
  return {
    type: SELECT_SOURCE_RELATION,
    relationName,
    entityPk
  }
}

export function toggleRelationMany(relationName, relationPk, entityPk) {
  return {
    type: TOGGLE_RELATION_MANY,
    relationName,
    relationPk,
    entityPk
  }
}
