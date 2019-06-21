export const LOCATION_CHANGED = 'path/LOCATION_CHANGED'
export const CACHE_MODEL = 'path/CACHE_MODEL'
export const SET_CURRENT_VIEW_INFO = 'path/SET_CURRENT_VIEW_INFO'

export const locationChanged = location => ({
  type: LOCATION_CHANGED,
  payload: {
    location
  }
})

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
