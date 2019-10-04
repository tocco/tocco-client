export const SET_INITIALIZED = 'entityList/SET_INITIALIZED'
export const INITIALIZE = 'entityList/INITIALIZE'
export const SET_SEARCH_FORM_TYPE = 'entityList/SET_SEARCH_FORM_TYPE'
export const SET_ENTITY_NAME = 'entityList/SET_ENTITY_NAME'
export const SET_ENTITY_MODEL = 'entityList/SET_ENTITY_MODEL'
export const SET_PARENT = 'entityList/SET_PARENT'
export const SET_SEARCH_FORM_POSITION = 'entityList/SET_SEARCH_FORM_POSITION'

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

export const setSearchFormType = searchFormType => ({
  type: SET_SEARCH_FORM_TYPE,
  payload: {
    searchFormType
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

export const setSearchFormPosition = searchFormPosition => ({
  type: SET_SEARCH_FORM_POSITION,
  payload: {
    searchFormPosition
  }
})
