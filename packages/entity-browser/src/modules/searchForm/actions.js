export const INITIALIZE = 'searchForm/INITIALIZE'
export const SET_FORM_DEFINITION = 'searchForm/SET_FORM_DEFINITION'
export const SET_ENTITY_MODEL = 'searchForm/SET_ENTITY_MODEL'
export const SET_RELATION_ENTITIES = 'searchForm/SET_RELATION_ENTITIES'
export const SET_SEARCH_INPUT = 'searchForm/SET_SEARCH_INPUT'
export const SEARCH_TERM_CHANGE = 'searchForm/SEARCH_TERM_CHANGE'
export const RESET = 'searchForm/RESET'

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

