export const INITIALIZE_QUESTION_FORM = 'simpleForm/INITIALIZE_QUESTION_FORM'
export const LOAD_RELATION_ENTITY = 'simpleForm/LOAD_RELATION_ENTITY'
export const SET_RELATION_ENTITY = 'simpleForm/SET_RELATION_ENTITY'
export const SET_RELATION_ENTITY_LOADED = 'simpleForm/SET_RELATION_ENTITY_LOADED'
export const SUBMIT = 'simpleForm/SUBMIT'
export const CANCEL = 'simpleForm/CANCEL'

export const initializeForm = () => ({
  type: INITIALIZE_QUESTION_FORM,
  payload: {
  }
})

export const loadRelationEntity = entityName => ({
  type: LOAD_RELATION_ENTITY,
  payload: {
    entityName
  }
})

export const setRelationEntityLoaded = entityName => ({
  type: SET_RELATION_ENTITY_LOADED,
  payload: {
    entityName
  }
})

export const setRelationEntity = (entityName, entities, reset = false) => ({
  type: SET_RELATION_ENTITY,
  payload: {
    entityName,
    entities,
    reset
  }
})

export const submit = () => ({
  type: SUBMIT
})

export const cancel = () => ({
  type: CANCEL
})
