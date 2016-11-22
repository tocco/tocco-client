export const INITIALIZED = 'INITIALIZED'
export const REQUEST_RECORDS = 'REQUEST_RECORDS'
export const SET_ENTITY_NAME = 'SET_ENTITY_NAME'
export const SET_RECORDS = 'SET_RECORDS'
export const SET_COLUMN_DEFINITION = 'SET_COLUMN_DEFINITION'
export const SET_ORDER_BY = 'SET_ORDER_BY'
export const SET_MAX_RECORDS = 'SET_MAX_RECORDS'
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

export const initialized = () => ({
  type: INITIALIZED
})

export const setEntityName = entityName => ({
  type: SET_ENTITY_NAME,
  payload: {
    entityName
  }
})

export const requestRecords = () => ({
  type: REQUEST_RECORDS
})

export const setRecords = records => ({
  type: SET_RECORDS,
  payload: {
    records
  }
})

export const setColumnDefinition = columnDefinition => ({
  type: SET_COLUMN_DEFINITION,
  payload: {
    columnDefinition
  }
})

export const setOrderBy = orderBy => ({
  type: SET_ORDER_BY,
  payload: {
    orderBy
  }
})

export const setMaxRecords = maxRecords => ({
  type: SET_MAX_RECORDS,
  payload: {
    maxRecords
  }
})

export const setSearchTerm = searchTerm => ({
  type: SET_SEARCH_TERM,
  payload: {
    searchTerm
  }
})

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  payload: {
    currentPage
  }
})
