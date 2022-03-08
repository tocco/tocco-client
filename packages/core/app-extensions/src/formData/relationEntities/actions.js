export const LOAD_RELATION_ENTITIES = 'formData/LOAD_RELATION_ENTITIES'
export const SET_RELATION_ENTITIES = 'formData/SET_RELATION_ENTITIES'
export const SET_RELATION_ENTITIES_LOADING = 'formData/SET_RELATION_ENTITIES_LOADING'

export const loadRelationEntities = (fieldName, entityName, options) => ({
  type: LOAD_RELATION_ENTITIES,
  payload: {
    fieldName,
    entityName,
    options
  }
})

export const setRelationEntityLoading = fieldName => ({
  type: SET_RELATION_ENTITIES_LOADING,
  payload: {
    fieldName
  }
})

export const setRelationEntities = (fieldName, entities, moreEntitiesAvailable = false) => ({
  type: SET_RELATION_ENTITIES,
  payload: {
    fieldName,
    entities,
    moreEntitiesAvailable
  }
})
