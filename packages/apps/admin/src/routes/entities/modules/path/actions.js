export const SET_CURRENT_VIEW_INFO = 'path/SET_CURRENT_VIEW_INFO'
export const LOAD_CURRENT_ROUTE = 'path/LOAD_CURRENT_ROUTE'
export const SET_BREADCRUMBS_INFO = 'path/SET_BREADCRUMBS_INFO'
export const UPDATE_BREADCRUMBS_INFO = 'path/UPDATE_BREADCRUMBS_INFO'
export const SET_RELATIONS = 'path/SET_RELATIONS'
export const SET_CURRENT_VIEW_TITLE = 'path/SET_CURRENT_VIEW_TITLE'
export const SET_RELATIONS_INFO = 'path/SET_RELATIONS_INFO'
export const PROPAGATE_REFRESH = 'path/PROPAGATE_REFRESH'
export const INVALIDATE_LAST_BREADCRUMB = 'path/INVALIDATE_LAST_BREADCRUMB'
export const SELECT_RELATION = 'path/SELECT_RELATION'

export const setCurrentViewInfo = (location, currentViewInfo) => ({
  type: SET_CURRENT_VIEW_INFO,
  payload: {
    location,
    currentViewInfo
  }
})

export const loadCurrentRoute = location => ({
  type: LOAD_CURRENT_ROUTE,
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

export const updateBreadcrumbsInfo = (path, breadcrumbsInfo) => ({
  type: UPDATE_BREADCRUMBS_INFO,
  payload: {
    path,
    breadcrumbsInfo
  }
})

export const setRelations = relations => ({
  type: SET_RELATIONS,
  payload: {
    relations
  }
})

export const setCurrentViewTitle = currentViewTitle => ({
  type: SET_CURRENT_VIEW_TITLE,
  payload: {
    currentViewTitle
  }
})

export const setRelationsInfo = relationsInfo => ({
  type: SET_RELATIONS_INFO,
  payload: {
    relationsInfo
  }
})

export const propagateRefresh = location => ({
  type: PROPAGATE_REFRESH,
  payload: {
    location
  }
})

export const invalidateLastBreadcrumb = location => ({
  type: INVALIDATE_LAST_BREADCRUMB,
  payload: {
    location
  }
})

export const selectRelation = selectedRelation => ({
  type: SELECT_RELATION,
  payload: {
    selectedRelation
  }
})
