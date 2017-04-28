export const INITIALIZED = 'entityBrowser/INITIALIZED'
export const INITIALIZE = 'entityBrowser/INITIALIZE'
export const SET_SHOW_SEARCH_FORM = 'entityList/SET_SHOW_SEARCH_FORM'
export const SET_ENTITY_NAME = 'entityList/SET_ENTITY_NAME'

export const SET_ENTITY_MODEL = 'entityBrowser/SET_ENTITY_MODEL'

export const initialized = () => ({
  type: INITIALIZED,
  payload: {
    initialized: true
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
