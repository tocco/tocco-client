export const LOAD_RELATION_ENTITY = 'relationEntity/LOAD_RELATION_ENTITY'
export const SET_RELATION_ENTITY = 'relationEntity/SET_RELATION_ENTITY'
export const SET_RELATION_ENTITY_LOADED = 'relationEntity/SET_RELATION_ENTITY_LOADED'

export const loadRelationEntity = entityName => ({
  type: LOAD_RELATION_ENTITY,
  payload: {
    entityName
  }
})

export const setRelationEntityLoaded = entityName => ({
  type: SET_RELATION_ENTITY_LOADED,
  payload: {
    entityName
  }
})

export const setRelationEntity = (entityName, entities, reset = false) => ({
  type: SET_RELATION_ENTITY,
  payload: {
    entityName,
    entities,
    reset
  }
})
