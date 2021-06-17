export const SET_INITIALIZED = 'searchForm/SET_INITIALIZED'
export const INITIALIZE = 'searchForm/INITIALIZE'
export const SET_FORM_DEFINITION = 'searchForm/SET_FORM_DEFINITION'
export const EXECUTE_SEARCH = 'searchForm/EXECUTE_SEARCH'
export const RESET_SEARCH = 'searchForm/RESET_SEARCH'
export const SET_SHOW_EXTENDED_SEARCH_FORM = 'searchForm/SET_SHOW_EXTENDED_SEARCH_FORM'
export const SET_SIMPLE_SEARCH_FIELDS = 'searchForm/SET_SIMPLE_SEARCH_FIELDS'
export const SET_DISABLE_SIMPLE_SEARCH = 'searchForm/SET_DISABLE_SIMPLE_SEARCH'
export const SET_SEARCH_FORM_NAME = 'searchForm/SET_SEARCH_FORM_NAME'
export const SUBMIT_SEARCH_FORM = 'searchForm/SUBMIT_SEARCH_FORM'
export const SET_VALUES_INITIALIZED = 'searchForm/SET_VALUES_INITIALIZED'
export const ADVANCED_SEARCH_UPDATE = 'searchForm/ADVANCED_SEARCH_UPDATE'
export const SET_FORM_FIELDS_FLAT = 'searchForm/SET_FORM_FIELDS_FLAT'
export const SET_SEARCH_FILTERS = 'searchForm/SET_SEARCH_FILTERS'
export const SET_SEARCH_FILTER_ACTIVE = 'searchForm/SET_SEARCH_FILTER_ACTIVE'
export const DELETE_SEARCH_FILTER = 'searchForm/DELETE_SEARCH_FILTER'
export const SAVE_SEARCH_FILTER = 'searchForm/SAVE_SEARCH_FILTER'
export const SAVE_DEFAULT_SEARCH_FILTER = 'searchForm/SAVE_DEFAULT_SEARCH_FILTER'
export const RESET_DEFAULT_SEARCH_FILTER = 'searchForm/RESET_DEFAULT_SEARCH_FILTER'
export const DISPLAY_SEARCH_FIELDS_MODAL = 'searchForm/DISPLAY_SEARCH_FIELDS_MODAL'
export const RESET_SEARCH_FIELDS = 'searchForm/resetSearchFields'

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

export const submitSearchForm = () => ({
  type: SUBMIT_SEARCH_FORM
})

export const setValuesInitialized = valuesInitialized => ({
  type: SET_VALUES_INITIALIZED,
  payload: {
    valuesInitialized
  }
})

export const setFormFieldsFlat = formFieldsFlat => ({
  type: SET_FORM_FIELDS_FLAT,
  payload: {
    formFieldsFlat
  }
})

export const setSearchFilters = searchFilters => ({
  type: SET_SEARCH_FILTERS,
  payload: {
    searchFilters
  }
})

export const setSearchFilterActive = (searchFilterId, active, exclusive) => ({
  type: SET_SEARCH_FILTER_ACTIVE,
  payload: {
    searchFilterId,
    active,
    exclusive
  }
})

export const deleteSearchFilter = primaryKey => ({
  type: DELETE_SEARCH_FILTER,
  payload: {
    primaryKey
  }
})

export const saveSearchFilter = () => ({
  type: SAVE_SEARCH_FILTER
})

export const saveDefaultSearchFilter = () => ({
  type: SAVE_DEFAULT_SEARCH_FILTER
})

export const resetDefaultSearchFilter = () => ({
  type: RESET_DEFAULT_SEARCH_FILTER
})

export const displaySearchFieldsModal = () => ({
  type: DISPLAY_SEARCH_FIELDS_MODAL
})

export const resetSearchFields = () => ({
  type: RESET_SEARCH_FIELDS
})
