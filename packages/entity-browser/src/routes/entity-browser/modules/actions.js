export const INITIALIZED = 'entityBrowser/INITIALIZED'
export const INITIALIZE = 'entityBrowser/INITIALIZE'

export const SET_ENTITY_NAME = 'SET_ENTITY_NAME'
export const SET_FORM_BASE = 'SET_FORM_BASE'
export const SET_SHOW_SEARCH_FORM = 'SET_SEARCH_FORM'
export const SET_DISABLE_SIMPLE_SEARCH = 'SET_DISABLE_SIMPLE_SEARCH'
export const SET_SIMPLE_SEARCH_FIELDS = 'SET_SIMPLE_SEARCH_FIELDS'

export const SET_ENTITY_MODEL = 'entityBrowser/SET_ENTITY_MODEL'

export const initialized = () => ({
  type: INITIALIZED
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

export const setShowSearchForm = showSearchForm => ({
  type: SET_SHOW_SEARCH_FORM,
  payload: {
    showSearchForm
  }
})

export const setDisableSimpleSearch = disableSimpleSearch => ({
  type: SET_DISABLE_SIMPLE_SEARCH,
  payload: {
    disableSimpleSearch
  }
})

export const setSimpleSearchFields = simpleSearchFields => ({
  type: SET_SIMPLE_SEARCH_FIELDS,
  payload: {
    simpleSearchFields
  }
})

export const setEntityModel = entityModel => ({
  type: SET_ENTITY_MODEL,
  payload: {
    entityModel
  }
})
