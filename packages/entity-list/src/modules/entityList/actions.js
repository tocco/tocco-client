export const SET_INITIALIZED = 'entityList/SET_INITIALIZED'
export const INITIALIZE = 'entityList/INITIALIZE'
export const SET_SHOW_SEARCH_FORM = 'entityList/SET_SHOW_SEARCH_FORM'
export const SET_ENTITY_NAME = 'entityList/SET_ENTITY_NAME'
export const SET_ENTITY_MODEL = 'entityList/SET_ENTITY_MODEL'
export const SET_PARENT = 'entityList/SET_PARENT'

export const setInitialized = (initialized = true) => ({
  type: SET_INITIALIZED,
  payload: {
    initialized
  }
})

export const initialize = () => ({
  type: INITIALIZE
})

export const setEntityModel = entityModel => ({
  type: SET_ENTITY_MODEL,
  payload: {
    entityModel
  }
})

export const setShowSearchForm = showSearchForm => ({
  type: SET_SHOW_SEARCH_FORM,
  payload: {
    showSearchForm
  }
})

export const setEntityName = entityName => ({
  type: SET_ENTITY_NAME,
  payload: {
    entityName
  }
})

export const setParent = parent => ({
  type: SET_PARENT,
  payload: {
    parent
  }
})
