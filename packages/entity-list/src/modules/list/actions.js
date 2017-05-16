export const INITIALIZE = 'listView/INITIALIZE'

export const REQUEST_ENTITIES = 'listView/REQUEST_ENTITIES'
export const SET_ENTITIES = 'listView/SET_ENTITIES'
export const SET_COLUMN_DEFINITION = 'listView/SET_COLUMN_DEFINITION'
export const SET_ENTITY_MODEL = 'listView/SET_ENTITY_MODEL'
export const SET_ORDER_BY = 'listView/SET_ORDER_BY'
export const SET_LIMIT = 'listView/SET_LIMIT'
export const SET_CURRENT_PAGE = 'listView/SET_CURRENT_PAGE'
export const SET_ENTITY_COUNT = 'listView/SET_ENTITY_COUNT'
export const ADD_ENTITIES_TO_STORE = 'listView/ADD_ENTITIES_TO_STORE'
export const CLEAR_ENTITY_STORE = 'listView/CLEAR_ENTITIES_CACHE'
export const RESET_DATA_SET = 'listView/RESET_DATA_SET'
export const SET_IN_PROGRESS = 'listView/SET_IN_PROGRESS'
export const CHANGE_PAGE = 'listView/CHANGE_PAGE'
export const REFRESH = 'listView/REFRESH'
export const SET_SHOW_SEARCH_FORM = 'SET_SEARCH_FORM'
export const SET_SEARCH_FILTERS = 'SET_SEARCH_FILTERS'
export const SET_SIMPLE_SEARCH_FIELDS = 'SET_SIMPLE_SEARCH_FIELDS'
export const SET_LIST_FORM_NAME = 'listView/SET_LIST_FORM_NAME'

export const initialize = () => ({
  type: INITIALIZE
})

export const requestEntities = (page, show) => ({
  type: REQUEST_ENTITIES,
  payload: {
    page,
    show
  }
})

export const setEntities = entities => ({
  type: SET_ENTITIES,
  payload: {
    entities
  }
})

export const addEntitiesToStore = (page, entities) => ({
  type: ADD_ENTITIES_TO_STORE,
  payload: {
    page,
    entities
  }
})

export const clearEntityStore = () => ({
  type: CLEAR_ENTITY_STORE
})

export const setEntityCount = entityCount => ({
  type: SET_ENTITY_COUNT,
  payload: {
    entityCount
  }
})

export const setColumnDefinition = columnDefinition => ({
  type: SET_COLUMN_DEFINITION,
  payload: {
    columnDefinition
  }
})

export const setEntityModel = entityModel => ({
  type: SET_ENTITY_MODEL,
  payload: {
    entityModel
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

export const setShowSearchForm = showSearchForm => ({
  type: SET_SHOW_SEARCH_FORM,
  payload: {
    showSearchForm
  }
})

export const setSearchFilters = searchFilters => ({
  type: SET_SEARCH_FILTERS,
  payload: {
    searchFilters
  }
})

export const setListFormName = listFormName => ({
  type: SET_LIST_FORM_NAME,
  payload: {
    listFormName
  }
})
