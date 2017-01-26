export const INITIALIZED = 'entityBrowser/INITIALIZED'
export const INITIALIZE = 'entityBrowser/INITIALIZE'

export const SET_ENTITY_NAME = 'SET_ENTITY_NAME'
export const SET_FORM_BASE = 'SET_FORM_BASE'

export const SHOW_ENTITY_DETAIL = 'SHOW_ENTITY_DETAIL'
export const CLOSE_ENTITY_DETAIL = 'CLOSE_ENTITY_DETAIL'

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

export const showEntityDetail = entityId => ({
  type: SHOW_ENTITY_DETAIL,
  payload: {
    entityId
  }
})

export const closeEntityDetail = () => ({
  type: SHOW_ENTITY_DETAIL,
  payload: {
    entityId: undefined
  }
})

export const setEntityModel = entityModel => ({
  type: SET_ENTITY_MODEL,
  payload: {
    entityModel
  }
})
