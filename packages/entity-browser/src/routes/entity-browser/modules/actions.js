export const INITIALIZED = 'entityBrowser/INITIALIZED'
export const INITIALIZE = 'entityBrowser/INITIALIZE'

export const SET_ENTITY_NAME = 'SET_ENTITY_NAME'
export const SET_FORM_BASE = 'SET_FORM_BASE'
export const SET_ENTITY_MODEL = 'entityBrowser/SET_ENTITY_MODEL'
export const LOAD_RELATION_ENTITY = 'entityBrowser/LOAD_RELATION_ENTITY'
export const SET_RELATION_ENTITY = 'entityBrowser/SET_RELATION_ENTITY'
export const SET_RELATION_ENTITY_LOADED = 'entityBrowser/SET_RELATION_ENTITY_LOADED'

export const initialized = () => ({
  type: INITIALIZED,
  payload: {
    initialized: true
  }
})

export const initialize = () => ({
  type: INITIALIZE
})

export const setEntityName = entityName => ({
  type: SET_ENTITY_NAME,
  payload: {
    entityName
  }
})

export const setFormBase = formBase => ({
  type: SET_FORM_BASE,
  payload: {
    formBase
  }
})

export const setEntityModel = entityModel => ({
  type: SET_ENTITY_MODEL,
  payload: {
    entityModel
  }
})

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
