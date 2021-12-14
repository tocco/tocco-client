export const SET_INITIALIZED = 'entityList/SET_INITIALIZED'
export const INITIALIZE = 'entityList/INITIALIZE'
export const SET_SEARCH_FORM_TYPE = 'entityList/SET_SEARCH_FORM_TYPE'
export const SET_ENTITY_NAME = 'entityList/SET_ENTITY_NAME'
export const SET_PARENT = 'entityList/SET_PARENT'
export const SET_SEARCH_FORM_POSITION = 'entityList/SET_SEARCH_FORM_POSITION'
export const SET_FORM_NAME = 'entityList/SET_FORM_NAME'
export const RELOAD_ALL = 'entityList/RELOAD_ALL'
export const RELOAD_DATA = 'entityList/RELOAD_DATA'
export const SET_SEARCH_FORM_COLLAPSED = 'entityList/SET_SEARCH_FORM_COLLAPSED'
export const SET_SEARCH_FORM_COLLAPSED_INITIAL_VALUE = 'entityList/SET_SEARCH_FORM_COLLAPSED_INITIAL_VALUE'
export const SET_SCROLL_BEHAVIOUR = 'entityList/SET_SCROLL_BEHAVIOUR'

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

export const setSearchFormCollapsed = searchFormCollapsed => ({
  type: SET_SEARCH_FORM_COLLAPSED,
  payload: {
    searchFormCollapsed
  }
})

export const setSearchFormCollapsedInitialValue = searchFormCollapsed => ({
  type: SET_SEARCH_FORM_COLLAPSED_INITIAL_VALUE,
  payload: {
    searchFormCollapsed
  }
})

export const setScrollBehaviour = scrollBehaviour => ({
  type: SET_SCROLL_BEHAVIOUR,
  payload: {
    scrollBehaviour
  }
})
