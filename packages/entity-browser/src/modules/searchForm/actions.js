export const SET_FORM = 'SET_FORM'
export const SET_FORM_DEFINITION = 'SET_FORM_DEFINITION'
export const SET_ENTITY_MODEL = 'SET_ENTITY_MODEL'
export const SET_RELATION_ENTITIES = 'SET_RELATION_ENTITIES'
export const SET_SEARCH_INPUT = 'SET_SEARCH_INPUT'
export const SEARCH_TERM_CHANGE = 'SEARCH_TERM_CHANGE'
export const RESET = 'RESET'

export const setForm = (entityName, formName) => ({
  type: SET_FORM,
  payload: {
    entityName,
    formName
  }
})

export const setFormDefinition = formDefinition => ({
  type: SET_FORM_DEFINITION,
  payload: {
    formDefinition
  }
})

export const setEntityModel = entityModel => ({
  type: SET_ENTITY_MODEL,
  payload: {
    entityModel
  }
})

export const setRelationEntities = relationEntities => ({
  type: SET_RELATION_ENTITIES,
  payload: {
    relationEntities
  }
})

export const setSearchInput = (field, value) => ({
  type: SET_SEARCH_INPUT,
  payload: {
    field,
    value
  }
})

export const searchTermChange = searchInputs => ({
  type: SEARCH_TERM_CHANGE,
  payload: {
    searchInputs
  }
})

export const reset = () => ({
  type: RESET
})

