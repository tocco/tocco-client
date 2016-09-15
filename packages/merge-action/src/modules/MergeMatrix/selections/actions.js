export const SELECT_SOURCE_FIELD = 'MergeMatrix/SELECT_SOURCE_FIELD'
export const SELECT_SOURCE_RELATION = 'MergeMatrix/SELECT_SOURCE_RELATION'
export const TOGGLE_RELATION_MANY = 'MergeMatrix/TOGGLE_RELATION_MANY'
export const CLEAR_RELATION_MANY = 'MergeMatrix/CLEAR_RELATION_MANY'

export const selectSourceField = (field, entityPk) => ({
  type: SELECT_SOURCE_FIELD,
  payload: {
    entityPk,
    field
  }

})

export const selectSourceRelation = (relationName, entityPk) => ({
  type: SELECT_SOURCE_RELATION,
  payload: {
    relationName,
    entityPk
  }
})

export const toggleRelationMany = (relationName, relationPk, entityPk) => ({
  type: TOGGLE_RELATION_MANY,
  payload: {
    relationName,
    relationPk,
    entityPk
  }
})

export const clearRelationMany = () => ({
  type: CLEAR_RELATION_MANY
})
