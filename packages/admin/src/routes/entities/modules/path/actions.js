export const CACHE_MODEL = 'path/CACHE_MODEL'
export const SET_CURRENT_VIEW_INFO = 'path/SET_CURRENT_VIEW_INFO'
export const LOAD_CURRENT_VIEW_INFO = 'path/LOAD_CURRENT_VIEW_INFO'
export const SET_BREADCRUMBS_INFO = 'path/SET_BREADCRUMBS_INFO'
export const SET_RELATIONS = 'path/SET_RELATIONS'
export const CACHE_DISPLAY = 'path/CACHE_DISPLAY'
export const SET_RELATION_COUNT = 'path/SET_RELATION_COUNT'
export const SET_CURRENT_VIEW_TITLE = 'path/SET_CURRENT_VIEW_TITLE'

export const cacheModel = (entity, model) => ({
  type: CACHE_MODEL,
  payload: {
    entity,
    model
  }
})

export const setCurrentViewInfo = (location, currentViewInfo) => ({
  type: SET_CURRENT_VIEW_INFO,
  payload: {
    location,
    currentViewInfo
  }
})

export const loadCurrentViewInfo = location => ({
  type: LOAD_CURRENT_VIEW_INFO,
  payload: {
    location
  }
})

export const setBreadcrumbsInfo = breadcrumbsInfo => ({
  type: SET_BREADCRUMBS_INFO,
  payload: {
    breadcrumbsInfo
  }
})

export const setRelations = relations => ({
  type: SET_RELATIONS,
  payload: {
    relations
  }
})

export const cacheDisplay = (entity, key, display) => ({
  type: CACHE_DISPLAY,
  payload: {
    entity,
    key,
    display
  }
})

export const setRelationCount = relationsCount => ({
  type: SET_RELATION_COUNT,
  payload: {
    relationsCount
  }
})

export const setCurrentViewTitle = currentViewTitle => ({
  type: SET_CURRENT_VIEW_TITLE,
  payload: {
    currentViewTitle
  }
})
