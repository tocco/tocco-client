export const INITIALIZED = 'INITIALIZED'
export const INITIALIZE_TABLE = 'INITIALIZE'
export const REQUEST_RECORDS = 'REQUEST_RECORDS'
export const SET_ENTITY_NAME = 'SET_ENTITY_NAME'
export const SET_RECORDS = 'SET_RECORDS'
export const SET_COLUMN_DEFINITION = 'SET_COLUMN_DEFINITION'
export const SET_ORDER_BY = 'SET_ORDER_BY'
export const SET_LIMIT = 'SET_LIMIT'
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_RECORD_COUNT = 'SET_RECORD_COUNT'
export const ADD_RECORDS_TO_CACHE = 'ADD_RECORDS_TO_CACHE'
export const CLEAR_RECORDS_CACHE = 'CLEAR_RECORDS_CACHE'

export const initialized = () => ({
  type: INITIALIZE_TABLE
})

export const initializeTable = () => ({
  type: INITIALIZE_TABLE
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

export const addRecordsToCache = (page, records) => ({
  type: ADD_RECORDS_TO_CACHE,
  payload: {
    page,
    records
  }
})

export const clearRecordsCache = () => ({
  type: CLEAR_RECORDS_CACHE
})

export const setRecordCount = recordCount => ({
  type: SET_RECORD_COUNT,
  payload: {
    recordCount
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

export const setLimit = limit => ({
  type: SET_LIMIT,
  payload: {
    limit
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
