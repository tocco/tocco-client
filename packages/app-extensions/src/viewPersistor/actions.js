export const PERSIST_VIEW_INFO = 'viewPersistor/PERSIST_VIEW_INFO'
export const CLEAR_PERSISTED_VIEWS = 'viewPersistor/CLEAR_PERSISTED_VIEWS'

export const persistViewInfo = (location, level, info) => ({
  type: PERSIST_VIEW_INFO,
  payload: {
    location,
    level,
    info
  }
})

export const clearPersistedViews = (level = 0) => ({
  type: CLEAR_PERSISTED_VIEWS,
  payload: {
    level
  }
})
