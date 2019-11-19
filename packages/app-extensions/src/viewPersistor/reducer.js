import _get from 'lodash/get'

import * as actions from './actions'

export const persistViewInfo = (state, {payload: {location, level, info}}) => ({
  ...state,
  persistedViews: {
    ...state.persistedViews,
    [location]: {
      level,
      info: {...(_get(state, ['persistedViews', location, 'info'], {})), ...info}
    }
  }
})

export const clearPersistedViews = (state, {payload: {level}}) => ({
  ...state,
  persistedViews: {
    ...(Object.keys(state.persistedViews).reduce((acc, key) => {
      const persistedView = state.persistedViews[key]
      return {...acc, ...(persistedView.level < level && {[key]: persistedView})}
    }, {}))
  }
})

const ACTION_HANDLERS = {
  [actions.PERSIST_VIEW_INFO]: persistViewInfo,
  [actions.CLEAR_PERSISTED_VIEWS]: clearPersistedViews
}

const initialState = {
  persistedViews: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
