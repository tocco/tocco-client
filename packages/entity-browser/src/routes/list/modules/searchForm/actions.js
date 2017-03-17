export const INITIALIZE = 'searchForm/INITIALIZE'
export const SET_FORM_DEFINITION = 'searchForm/SET_FORM_DEFINITION'
export const SET_RELATION_ENTITIES = 'searchForm/SET_RELATION_ENTITIES'
export const SET_SEARCH_INPUT = 'searchForm/SET_SEARCH_INPUT'
export const SEARCH_TERM_CHANGE = 'searchForm/SEARCH_TERM_CHANGE'
export const RESET = 'searchForm/RESET'
export const SET_SHOW_EXTENDED_SEARCH_FORM = 'searchForm/SET_SHOW_EXTENDED_SEARCH_FORM'
export const SET_SIMPLE_SEARCH_FIELDS = 'searchForm/SET_SIMPLE_SEARCH_FIELDS'
export const SET_PRESELECTED_SEARCH_FIELDS = 'searchForm/SET_PRESELECTED_SEARCH_FIELDS'
export const SET_DISABLE_SIMPLE_SEARCH = 'SET_DISABLE_SIMPLE_SEARCH'

export const initialize = () => ({
  type: INITIALIZE
})

export const setFormDefinition = formDefinition => ({
  type: SET_FORM_DEFINITION,
  payload: {
    formDefinition
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

export const setPreselectedSearchFields = preselectedSearchFields => ({
  type: SET_PRESELECTED_SEARCH_FIELDS,
  payload: {
    preselectedSearchFields
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

