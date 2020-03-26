export const INITIALIZE_SEARCH = 'inputEditSearch/INITIALIZE_SEARCH'
export const SET_FORM = 'inputEditSearch/SET_FORM'
export const SET_MODEL = 'inputEditSearch/SET_MODEL'
export const SET_SEARCH_QUERIES = 'inputEditSearch/SET_SEARCH_QUERIES'

export const initializeSearch = () => ({
  type: INITIALIZE_SEARCH
})

export const setForm = form => ({
  type: SET_FORM,
  payload: {form}
})

export const setModel = model => ({
  type: SET_MODEL,
  payload: {model}
})

export const setSearchQueries = searchQueries => ({
  type: SET_SEARCH_QUERIES,
  payload: {searchQueries}
})
