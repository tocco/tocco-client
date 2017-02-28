export const SET_FORM_DEFINITION = 'detailView/SET_FORM_DEFINITION'
export const LOAD_DETAIL_VIEW = 'detailView/LOAD_DETAIL_VIEW'
export const SET_ENTITY = 'detailView/SET_ENTITY'
export const SET_ENTITY_NAME = 'detailView/SET_ENTITY_NAME'
export const SUBMIT_FORM = 'detailView/SUBMIT_FORM'
export const LOAD_RELATION_ENTITIES = 'detailView/LOAD_RELATION_ENTITIES'
export const SET_STORE = 'detailView/SET_STORE'
export const SET_STORE_LOADED = 'detailView/SET_STORE_LOADED'
export const SET_LAST_SAVE = 'detailView/SET_LAST_SAVE'

export const setFormDefinition = formDefinition => ({
  type: SET_FORM_DEFINITION,
  payload: {
    formDefinition
  }
})

export const loadDetailView = entityId => ({
  type: LOAD_DETAIL_VIEW,
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

export const setLastSave = (lastSave = Date.now()) => ({
  type: SET_LAST_SAVE,
  payload: {
    lastSave
  }
})
