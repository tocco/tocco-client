export const LOAD_SEARCH_FILTERS = 'formData/LOAD_SEARCH_FILTERS'
export const SET_SEARCH_FILTER = 'formData/SET_SEARCH_FILTER'

export const loadSearchFilters = (entity, group) => ({
  type: LOAD_SEARCH_FILTERS,
  payload: {
    entity,
    group
  }
})

export const setSearchFilter = (entity, filters) => ({
  type: SET_SEARCH_FILTER,
  payload: {
    entity,
    filters
  }
})
