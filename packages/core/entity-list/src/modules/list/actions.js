export const INITIALIZE = 'list/INITIALIZE'
export const REQUEST_ENTITIES = 'list/REQUEST_ENTITIES'
export const SET_ENTITIES = 'list/SET_ENTITIES'
export const SET_FORM_DEFINITION = 'list/SET_FORM_DEFINITION'
export const SET_SEARCH_LIST_FORM_DEFINITION = 'list/SET_SEARCH_LIST_FORM_DEFINITION'
export const SET_ENTITY_MODEL = 'list/SET_ENTITY_MODEL'
export const SET_SORTING = 'list/SET_SORTING'
export const SET_CURRENT_PAGE = 'list/SET_CURRENT_PAGE'
export const SET_ENTITY_COUNT = 'list/SET_ENTITY_COUNT'
export const ADD_ENTITIES_TO_STORE = 'list/ADD_ENTITIES_TO_STORE'
export const CLEAR_ENTITY_STORE = 'list/CLEAR_ENTITIES_CACHE'
export const SET_IN_PROGRESS = 'list/SET_IN_PROGRESS'
export const CHANGE_PAGE = 'list/CHANGE_PAGE'
export const REFRESH = 'list/REFRESH'
export const SET_SEARCH_FILTERS = 'list/SET_SEARCH_FILTERS'
export const SET_SIMPLE_SEARCH_FIELDS = 'list/SET_SIMPLE_SEARCH_FIELDS'
export const ON_ROW_CLICK = 'list/ON_ROW_CLICK'
export const NAVIGATE_TO_CREATE = 'entityList/NAVIGATE_TO_CREATE'
export const QUERY_CHANGED = 'list/QUERY_CHANGED'
export const SET_LAZY_DATA = 'list/SET_LAZY_DATA'
export const NAVIGATE_TO_ACTION = 'list/NAVIGATE_TO_ACTION'
export const SET_SORTING_INTERACTIVE = 'list/SET_SORTING_INTERACTIVE'
export const DEFINE_SORTING = 'list/DEFINE_SORTING'
export const SET_CONSTRICTION = 'list/SET_CONSTRICTION'
export const SET_INITIALIZED = 'list/SET_INITIALIZED'
export const SET_MARKED = 'list/SET_MARKED'
export const TOGGLE_MARKINGS = 'list/TOGGLE_MARKINGS'

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

export const setFormDefinition = formDefinition => ({
  type: SET_FORM_DEFINITION,
  payload: {
    formDefinition
  }
})

export const setSearchListFormDefinition = searchListFormDefinition => ({
  type: SET_SEARCH_LIST_FORM_DEFINITION,
  payload: {
    searchListFormDefinition
  }
})

export const setEntityModel = entityModel => ({
  type: SET_ENTITY_MODEL,
  payload: {
    entityModel
  }
})

export const setSorting = sorting => ({
  type: SET_SORTING,
  payload: {
    sorting
  }
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

export const setSearchFilters = searchFilters => ({
  type: SET_SEARCH_FILTERS,
  payload: {
    searchFilters
  }
})

export const onRowClick = id => ({
  type: ON_ROW_CLICK,
  payload: {
    id
  }
})

export const navigateToCreate = relationName => ({
  type: NAVIGATE_TO_CREATE,
  payload: {
    relationName
  }
})

export const queryChanged = query => ({
  type: QUERY_CHANGED,
  payload: {
    query
  }
})

export const setLazyData = (type, id, values) => ({
  type: SET_LAZY_DATA,
  payload: {
    type,
    id,
    values
  }
})

export const navigateToAction = (definition, selection) => ({
  type: NAVIGATE_TO_ACTION,
  payload: {
    definition,
    selection
  }
})

export const setSortingInteractive = (field, add) => ({
  type: SET_SORTING_INTERACTIVE,
  payload: {
    field,
    add
  }
})

export const defineSorting = () => ({
  type: DEFINE_SORTING
})

export const setConstriction = constriction => ({
  type: SET_CONSTRICTION,
  payload: {
    constriction
  }
})

export const setInitialized = () => ({
  type: SET_INITIALIZED
})

export const setMarked = (entityName, entityKey, marked) => ({
  type: SET_MARKED,
  payload: {
    entityName,
    entityKey,
    marked
  }
})

export const toggleMarkings = selection => ({
  type: TOGGLE_MARKINGS,
  payload: {
    selection
  }
})
