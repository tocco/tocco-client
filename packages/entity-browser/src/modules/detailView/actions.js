export const INITIALIZE = 'detailView/INITIALIZE'
export const SET_FORM_DEFINITION = 'detailView/SET_FORM_DEFINITION'
export const LOAD_ENTITY = 'detailView/LOAD_ENTITY'
export const SET_ENTITY = 'detailView/SET_ENTITY'
export const SET_ENTITY_NAME = 'detailView/SET_ENTITY_NAME'
export const SUBMIT_FORM = 'detailView/SUBMIT_FORM'
export const LOAD_RELATION_ENTITIES = 'detailView/LOAD_RELATION_ENTITIES'
export const SET_STORE = 'detailView/SET_STORE'
export const SET_STORE_LOADED = 'detailView/SET_STORE_LOADED'
export const SET_ENTITY_MODEL = 'searchForm/SET_ENTITY_MODEL'

export const initialize = (entityName, formBase) => ({
  type: INITIALIZE,
  payload: {
    entityName,
    formBase
  }
})

export const setFormDefinition = formDefinition => ({
  type: SET_FORM_DEFINITION,
  payload: {
    formDefinition
  }
})

export const loadEntity = entityId => ({
  type: LOAD_ENTITY,
  payload: {
    entityId
  }
})

export const setEntityName = entityName => ({
  type: SET_ENTITY_NAME,
  payload: {
    entityName
  }
})

export const setEntity = entity => ({
  type: SET_ENTITY,
  payload: {
    entity
  }
})

export const submitForm = () => ({
  type: SUBMIT_FORM
})

export const loadRelationEntities = entityName => ({
  type: LOAD_RELATION_ENTITIES,
  payload: {
    entityName
  }
})

export const setStore = (entityName, store) => ({
  type: SET_STORE,
  payload: {
    entityName,
    store
  }
})

export const setStoreLoaded = (entityName, loaded) => ({
  type: SET_STORE_LOADED,
  payload: {
    entityName,
    loaded
  }
})

export const setEntityModel = entityModel => ({
  type: SET_ENTITY_MODEL,
  payload: {
    entityModel
  }
})
