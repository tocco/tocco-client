import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

export const cacheModel = (state, {payload: {entity, model}}) => (
  {
    ...state,
    modelCache: {
      ...state.modelCache,
      [entity]: model
    }
  }
)

export const cacheDisplay = (state, {payload: {entity, key, display}}) => (
  {
    ...state,
    displayCache: {
      ...state.displayCache,
      [entity]: {
        ...state.displayCache[entity],
        [key]: display
      }
    }
  }
)

export const setCurrentViewInfo = (state, {payload: {location, currentViewInfo}}) => ({
  ...state,
  currentViewInfos: {
    ...state.currentViewInfos,
    [location]: currentViewInfo
  }
})

const ACTION_HANDLERS = {
  [actions.CACHE_MODEL]: cacheModel,
  [actions.CACHE_DISPLAY]: cacheDisplay,
  [actions.SET_CURRENT_VIEW_INFO]: setCurrentViewInfo,
  [actions.SET_BREADCRUMBS_INFO]: reducerUtil.singleTransferReducer('breadcrumbsInfo'),
  [actions.SET_RELATIONS]: reducerUtil.singleTransferReducer('relations'),
  [actions.SET_RELATIONS_INFO]: reducerUtil.singleTransferReducer('relationsInfo'),
  [actions.SET_CURRENT_VIEW_TITLE]: reducerUtil.singleTransferReducer('currentViewTitle')
}

const initialState = {
  modelCache: {},
  displayCache: {},
  currentViewInfos: {},
  breadcrumbsInfo: [],
  relations: null,
  relationsInfo: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
