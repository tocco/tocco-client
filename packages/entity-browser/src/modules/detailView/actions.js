export const INITIALIZE = 'detailView/INITIALIZE'
export const SET_FORM_DEFINITION = 'detailView/SET_FORM_DEFINITION'
export const LOAD_ENTITY = 'detailView/LOAD_ENTITY'
export const SET_ENTITY = 'detailView/SET_ENTITY'
export const SET_ENTITY_NAME = 'detailView/SET_ENTITY_NAME'
export const SUBMIT_FORM = 'detailView/SUBMIT_FORM'

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

export const loadEntity = entityId => ({
  type: LOAD_ENTITY,
  payload: {
    entityId
  }
})

export const setEntityName = entityName => ({
  type: SET_ENTITY_NAME,
  payload: {
    entityName
  }
})

export const setEntity = entity => ({
  type: SET_ENTITY,
  payload: {
    entity
  }
})

export const submitForm = () => ({
  type: SUBMIT_FORM
})
