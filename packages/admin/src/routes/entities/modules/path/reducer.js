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

export const setBreadcrumbDisplay = (state, {payload: {display, idx}}) => {
  const newState = {...state, breadcrumbsInfo: [...state.breadcrumbsInfo]}
  newState.breadcrumbsInfo[idx].display = display
  return newState
}

const ACTION_HANDLERS = {
  [actions.CACHE_MODEL]: cacheModel,
  [actions.CACHE_DISPLAY]: cacheDisplay,
  [actions.SET_CURRENT_VIEW_INFO]: reducerUtil.singleTransferReducer('currentViewInfo'),
  [actions.SET_BREADCRUMBS_INFO]: reducerUtil.singleTransferReducer('breadcrumbsInfo'),
  [actions.SET_RELATIONS]: reducerUtil.singleTransferReducer('relations'),
  [actions.SET_RELATION_COUNT]: reducerUtil.singleTransferReducer('relationsCount'),
  [actions.SET_BREADCRUMB_DISPLAY]: setBreadcrumbDisplay
}

const initialState = {
  modelCache: {},
  displayCache: {},
  currentViewInfo: null,
  breadcrumbsInfo: [],
  relations: null,
  relationsCount: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
