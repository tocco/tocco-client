export const INITIALIZE = 'searchForm/INITIALIZE'
export const SET_FORM_DEFINITION = 'searchForm/SET_FORM_DEFINITION'
export const SET_ENTITY_MODEL = 'searchForm/SET_ENTITY_MODEL'
export const SET_RELATION_ENTITIES = 'searchForm/SET_RELATION_ENTITIES'
export const SET_SEARCH_INPUT = 'searchForm/SET_SEARCH_INPUT'
export const SEARCH_TERM_CHANGE = 'searchForm/SEARCH_TERM_CHANGE'
export const RESET = 'searchForm/RESET'
export const SET_SHOW_EXTENDED_SEARCH_FORM = 'searchForm/SET_SHOW_EXTENDED_SEARCH_FORM'
export const SET_SIMPLE_SEARCH_FIELDS = 'searchForm/SET_SIMPLE_SEARCH_FIELDS'

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

export const setShowExtendedSearchForm = showExtendedSearchForm => ({
  type: SET_SHOW_EXTENDED_SEARCH_FORM,
  payload: {
    showExtendedSearchForm
  }
})

export const setSimpleSearchFields = simpleSearchFields => ({
  type: SET_SIMPLE_SEARCH_FIELDS,
  payload: {
    simpleSearchFields
  }
})
