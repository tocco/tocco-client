export const INITIALIZED = 'INITIALIZED'
export const INITIALIZE_TABLE = 'INITIALIZE'
export const REQUEST_RECORDS = 'REQUEST_RECORDS'
export const SET_ENTITY_NAME = 'SET_ENTITY_NAME'
export const SET_FORM_BASE = 'SET_FORM_BASE'
export const SET_RECORDS = 'SET_RECORDS'
export const SET_SEARCH_FORM_DEFINITION = 'SET_SEARCH_FORM_DEFINITION'
export const SET_COLUMN_DEFINITION = 'SET_COLUMN_DEFINITION'
export const SET_ORDER_BY = 'SET_ORDER_BY'
export const SET_LIMIT = 'SET_LIMIT'
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
export const SET_RECORD_COUNT = 'SET_RECORD_COUNT'
export const ADD_RECORDS_TO_STORE = 'ADD_RECORDS_TO_STORE'
export const CLEAR_RECORD_STORE = 'CLEAR_RECORDS_CACHE'
export const RESET_DATA_SET = 'RESET_DATA_SET'
export const SET_RECORD_REQUEST_IN_PROGRESS = 'RECORD_REQUEST_IN_PROGRESS'
export const CHANGE_PAGE = 'CHANGE_PAGE'

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

export const setFormBase = formBase => ({
  type: SET_FORM_BASE,
  payload: {
    formBase
  }
})

export const requestRecords = (page, show) => ({
  type: REQUEST_RECORDS,
  payload: {
    page,
    show
  }
})

export const setRecords = records => ({
  type: SET_RECORDS,
  payload: {
    records
  }
})

export const addRecordsToStore = (page, records) => ({
  type: ADD_RECORDS_TO_STORE,
  payload: {
    page,
    records
  }
})

export const clearRecordStore = () => ({
  type: CLEAR_RECORD_STORE
})

export const setRecordCount = recordCount => ({
  type: SET_RECORD_COUNT,
  payload: {
    recordCount
  }
})

export const setSearchFormDefinition = searchFormDefinition => ({
  type: SET_SEARCH_FORM_DEFINITION,
  payload: {
    searchFormDefinition
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

export const resetDataSet = () => ({
  type: RESET_DATA_SET
})

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  payload: {
    currentPage
  }
})

export const setRecordRequestInProgress = recordRequestInProgress => ({
  type: SET_RECORD_REQUEST_IN_PROGRESS,
  payload: {
    recordRequestInProgress
  }
})

export const changePage = page => ({
  type: CHANGE_PAGE,
  payload: {
    page
  }
})
