export const SET_INITIALIZED = 'searchForm/SET_INITIALIZED'
export const INITIALIZE = 'searchForm/INITIALIZE'
export const SET_FORM_DEFINITION = 'searchForm/SET_FORM_DEFINITION'
export const LOAD_RELATION_ENTITY = 'searchForm/LOAD_RELATION_ENTITY'
export const LOAD_SEARCH_FILTERS = 'searchForm/LOAD_SEARCH_FILTERS'
export const SET_RELATION_ENTITY = 'searchForm/SET_RELATION_ENTITY'
export const SET_SEARCH_FILTER = 'searchForm/SET_SEARCH_FILTER'
export const SET_RELATION_ENTITY_LOADED = 'searchForm/SET_RELATION_ENTITY_LOADED'
export const EXECUTE_SEARCH = 'searchForm/EXECUTE_SEARCH'
export const RESET_SEARCH = 'searchForm/RESET_SEARCH'
export const SET_SHOW_EXTENDED_SEARCH_FORM = 'searchForm/SET_SHOW_EXTENDED_SEARCH_FORM'
export const SET_SIMPLE_SEARCH_FIELDS = 'searchForm/SET_SIMPLE_SEARCH_FIELDS'
export const SET_PRESELECTED_SEARCH_FIELDS = 'searchForm/SET_PRESELECTED_SEARCH_FIELDS'
export const SET_DISABLE_SIMPLE_SEARCH = 'searchForm/SET_DISABLE_SIMPLE_SEARCH'
export const SET_SEARCH_FORM_NAME = 'searchForm/SET_SEARCH_FORM_NAME'
export const SUBMIT_SEARCH_FORM = 'searchForm/SUBMIT_SEARCH_FORM'
export const SET_VALUES_INITIALIZED = 'searchForm/SET_VALUES_INITIALIZED'

export const setInitialized = (initialized = true) => ({
  type: SET_INITIALIZED,
  payload: {
    initialized
  }
})

export const initialize = () => ({
  type: INITIALIZE
})

export const setFormDefinition = formDefinition => ({
  type: SET_FORM_DEFINITION,
  payload: {
    formDefinition
  }
})

export const loadRelationEntity = entityName => ({
  type: LOAD_RELATION_ENTITY,
  payload: {
    entityName
  }
})

export const loadSearchFilters = (model, group) => ({
  type: LOAD_SEARCH_FILTERS,
  payload: {
    model,
    group
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

export const setSearchFilter = filter => ({
  type: SET_SEARCH_FILTER,
  payload: {
    filter
  }
})

export const executeSearch = () => ({
  type: EXECUTE_SEARCH
})

export const resetSearch = () => ({
  type: RESET_SEARCH
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

export const setDisableSimpleSearch = disableSimpleSearch => ({
  type: SET_DISABLE_SIMPLE_SEARCH,
  payload: {
    disableSimpleSearch
  }
})

export const setSearchFormName = searchFormName => ({
  type: SET_SEARCH_FORM_NAME,
  payload: {
    searchFormName
  }
})

export const submitSearchForm = () => ({
  type: SUBMIT_SEARCH_FORM
})

export const setValuesInitialized = valuesInitialized => ({
  type: SET_VALUES_INITIALIZED,
  payload: {
    valuesInitialized
  }
})
