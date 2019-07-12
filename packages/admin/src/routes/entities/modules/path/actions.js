export const CACHE_MODEL = 'path/CACHE_MODEL'
export const SET_CURRENT_VIEW_INFO = 'path/SET_CURRENT_VIEW_INFO'
export const LOAD_CURRENT_VIEW_INFO = 'path/LOAD_CURRENT_VIEW_INFO'

export const cacheModel = (entity, model) => ({
  type: CACHE_MODEL,
  payload: {
    entity,
    model
  }
})

export const setCurrentViewInfo = currentViewInfo => ({
  type: SET_CURRENT_VIEW_INFO,
  payload: {
    currentViewInfo
  }
})

export const loadCurrentViewInfo = location => ({
  type: LOAD_CURRENT_VIEW_INFO,
  payload: {
    location
  }
})
