export const INITIALIZE = 'detailView/INITIALIZE'
export const SET_FORM_DEFINITION = 'detailView/SET_FORM_DEFINITION'
export const LOAD_RECORD = 'detailView/LOAD_RECORD'
export const SET_RECORD = 'detailView/SET_RECORD'
export const SET_ENTITY_NAME = 'detailView/SET_ENTITY_NAME'

export const initialize = (entityName, formBase) => ({
  type: INITIALIZE,
  payload: {
    entityName,
    formBase
  }
})

export const setFormDefinition = formDefinition => ({
  type: SET_FORM_DEFINITION,
  payload: {
    formDefinition
  }
})

export const loadRecord = recordId => ({
  type: LOAD_RECORD,
  payload: {
    recordId
  }
})

export const setEntityName = entityName => ({
  type: SET_ENTITY_NAME,
  payload: {
    entityName
  }
})

export const setRecord = record => ({
  type: SET_RECORD,
  payload: {
    record
  }
})
