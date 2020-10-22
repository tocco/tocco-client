
import _get from 'lodash/get'

let persistedViews = {}

export const viewInfoSelector = location =>
  _get(persistedViews, [location, 'info'], {})

export const persistViewInfo = (location, info, level = 0) => {
  persistedViews = {
    ...persistedViews,
    [location]: {
      level,
      info: {...(_get(persistedViews, [location, 'info'], {})), ...info}
    }
  }
}

export const clearPersistedViews = (level = 0) => {
  persistedViews = {
    ...(Object.keys(persistedViews).reduce((acc, key) => {
      const persistedView = persistedViews[key]
      return {...acc, ...(persistedView.level < level && {[key]: persistedView})}
    }, {}))
  }
}
