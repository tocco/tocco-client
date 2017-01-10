export const INITIALIZED = 'entityBrowser/INITIALIZED'
export const INITIALIZE = 'entityBrowser/INITIALIZE'

export const SET_ENTITY_NAME = 'SET_ENTITY_NAME'
export const SET_FORM_BASE = 'SET_FORM_BASE'

export const SHOW_RECORD_DETAIL = 'SHOW_RECORD_DETAIL'
export const CLOSE_RECORD_DETAIL = 'CLOSE_RECORD_DETAIL'

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

export const showRecordDetail = recordId => ({
  type: SHOW_RECORD_DETAIL,
  payload: {
    recordId
  }
})

export const closeRecordDetail = () => ({
  type: SHOW_RECORD_DETAIL,
  payload: {
    recordId: undefined
  }
})
