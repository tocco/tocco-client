export const INITIALIZE = 'listView/INITIALIZE'

export const REQUEST_RECORDS = 'listView/REQUEST_RECORDS'
export const SET_ENTITY_NAME = 'listView/SET_ENTITY_NAME'
export const SET_RECORDS = 'listView/SET_RECORDS'
export const SET_COLUMN_DEFINITION = 'listView/SET_COLUMN_DEFINITION'
export const SET_ORDER_BY = 'listView/SET_ORDER_BY'
export const SET_LIMIT = 'listView/SET_LIMIT'
export const SET_CURRENT_PAGE = 'listView/SET_CURRENT_PAGE'
export const SET_RECORD_COUNT = 'listView/SET_RECORD_COUNT'
export const ADD_RECORDS_TO_STORE = 'listView/ADD_RECORDS_TO_STORE'
export const CLEAR_RECORD_STORE = 'listView/CLEAR_RECORDS_CACHE'
export const RESET_DATA_SET = 'listView/RESET_DATA_SET'
export const SET_IN_PROGRESS = 'listView/SET_IN_PROGRESS'
export const CHANGE_PAGE = 'listView/CHANGE_PAGE'
export const REFRESH = 'listView/REFRESH'

export const initialize = (entityName, formBase) => ({
  type: INITIALIZE,
  payload: {
    entityName,
    formBase
  }
})

export const setEntityName = entityName => ({
  type: SET_ENTITY_NAME,
  payload: {
    entityName
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

export const resetDataSet = () => ({
  type: RESET_DATA_SET
})

export const setCurrentPage = currentPage => ({
  type: SET_CURRENT_PAGE,
  payload: {
    currentPage
  }
})

export const setInProgress = inProgress => ({
  type: SET_IN_PROGRESS,
  payload: {
    inProgress
  }
})

export const changePage = page => ({
  type: CHANGE_PAGE,
  payload: {
    page
  }
})

export const refresh = () => ({
  type: REFRESH
})

