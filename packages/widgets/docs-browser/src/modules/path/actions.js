export const LOAD_BREADCRUMBS = 'docs/path/LOAD_BREADCRUMBS'
export const SET_BREADCRUMBS = 'docs/path/SET_BREADCRUMBS'
export const SET_SEARCH_MODE = 'docs/path/SET_SEARCH_MODE'

export const loadBreadcrumbs = location => ({
  type: LOAD_BREADCRUMBS,
  payload: {
    location
  }
})

export const setBreadcrumbs = breadcrumbs => ({
  type: SET_BREADCRUMBS,
  payload: {
    breadcrumbs
  }
})

export const setSearchMode = searchMode => ({
  type: SET_SEARCH_MODE,
  payload: {
    searchMode
  }
})
