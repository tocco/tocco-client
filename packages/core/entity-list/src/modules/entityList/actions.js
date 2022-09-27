export const SET_INITIALIZED = 'entityList/SET_INITIALIZED'
export const INITIALIZE = 'entityList/INITIALIZE'
export const SET_SEARCH_FORM_TYPE = 'entityList/SET_SEARCH_FORM_TYPE'
export const SET_SEARCH_FORM_TYPE_FROM_INPUT = 'entityList/SET_SEARCH_FORM_TYPE_FROM_INPUT'
export const RELOAD_ALL = 'entityList/RELOAD_ALL'
export const RELOAD_DATA = 'entityList/RELOAD_DATA'
export const SET_SEARCH_FORM_COLLAPSED = 'entityList/SET_SEARCH_FORM_COLLAPSED'
export const SET_SEARCH_FORM_COLLAPSED_INITIAL_VALUE = 'entityList/SET_SEARCH_FORM_COLLAPSED_INITIAL_VALUE'

export const setInitialized = (initialized = true) => ({
  type: SET_INITIALIZED,
  payload: {
    initialized
  }
})

export const initialize = () => ({
  type: INITIALIZE
})

export const setSearchFormTypeFromInput = searchFormType => ({
  type: SET_SEARCH_FORM_TYPE_FROM_INPUT,
  payload: {
    searchFormType
  }
})

export const setSearchFormType = searchFormType => ({
  type: SET_SEARCH_FORM_TYPE,
  payload: {
    searchFormType
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
