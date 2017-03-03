export const INITIALIZED = 'entityBrowser/INITIALIZED'
export const INITIALIZE = 'entityBrowser/INITIALIZE'

export const SET_ENTITY_NAME = 'SET_ENTITY_NAME'
export const SET_FORM_BASE = 'SET_FORM_BASE'
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
