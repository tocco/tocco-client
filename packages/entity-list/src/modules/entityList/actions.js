export const SET_INITIALIZED = 'entityList/SET_INITIALIZED'
export const INITIALIZE = 'entityList/INITIALIZE'
export const SET_SEARCH_FORM_TYPE = 'entityList/SET_SEARCH_FORM_TYPE'
export const SET_ENTITY_NAME = 'entityList/SET_ENTITY_NAME'
export const SET_PARENT = 'entityList/SET_PARENT'
export const SET_SEARCH_FORM_POSITION = 'entityList/SET_SEARCH_FORM_POSITION'
export const SET_FORM_NAME = 'entityList/SET_FORM_NAME'
export const RELOAD_ALL = 'entityList/RELOAD_ALL'
export const RELOAD_DATA = 'entityList/RELOAD_DATA'
export const SEARCH_FORM_COLLAPSED_CHANGE = 'entityList/SEARCH_FORM_COLLAPSED_CHANGE'

export const setInitialized = (initialized = true) => ({
  type: SET_INITIALIZED,
  payload: {
    initialized
  }
})

export const initialize = () => ({
  type: INITIALIZE
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

export const setFormName = formName => ({
  type: SET_FORM_NAME,
  payload: {
    formName
  }
})

export const reloadData = () => ({
  type: RELOAD_DATA
})

export const reloadAll = () => ({
  type: RELOAD_ALL
})

export const searchFormCollapsedChange = collapsed => ({
  type: SEARCH_FORM_COLLAPSED_CHANGE,
  payload: {
    collapsed
  }
})
