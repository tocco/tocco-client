import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

export const setCurrentViewInfo = (state, {payload: {location, currentViewInfo}}) => ({
  ...state,
  currentViewInfos: {
    ...state.currentViewInfos,
    [location]: {
      ...state.currentViewInfos[location],
      ...currentViewInfo
    }
  }
})

export const updateBreadcrumbsInfo = (state, {payload: {path, breadcrumbsInfo}}) => ({
  ...state,
  breadcrumbsInfo: state.breadcrumbsInfo.map(info => (info.path === path ? {...info, ...breadcrumbsInfo} : info))
})

const ACTION_HANDLERS = {
  [actions.SET_CURRENT_VIEW_INFO]: setCurrentViewInfo,
  [actions.SET_BREADCRUMBS_INFO]: reducerUtil.singleTransferReducer('breadcrumbsInfo'),
  [actions.UPDATE_BREADCRUMBS_INFO]: updateBreadcrumbsInfo,
  [actions.SET_RELATIONS]: reducerUtil.singleTransferReducer('relations'),
  [actions.SET_RELATIONS_INFO]: reducerUtil.singleTransferReducer('relationsInfo'),
  [actions.SET_CURRENT_VIEW_TITLE]: reducerUtil.singleTransferReducer('currentViewTitle'),
  [actions.SELECT_RELATION]: reducerUtil.singleTransferReducer('selectedRelation')
}

const initialState = {
  currentViewInfos: {},
  breadcrumbsInfo: [],
  relations: null,
  relationsInfo: {},
  selectedRelation: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
