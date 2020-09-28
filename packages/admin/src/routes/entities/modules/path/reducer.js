import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

export const setCurrentViewInfo = (state, {payload: {location, currentViewInfo}}) => ({
  ...state,
  currentViewInfos: {
    ...state.currentViewInfos,
    [location]: currentViewInfo
  }
})

const ACTION_HANDLERS = {
  [actions.SET_CURRENT_VIEW_INFO]: setCurrentViewInfo,
  [actions.SET_BREADCRUMBS_INFO]: reducerUtil.singleTransferReducer('breadcrumbsInfo'),
  [actions.SET_RELATIONS]: reducerUtil.singleTransferReducer('relations'),
  [actions.SET_RELATIONS_INFO]: reducerUtil.singleTransferReducer('relationsInfo'),
  [actions.SET_CURRENT_VIEW_TITLE]: reducerUtil.singleTransferReducer('currentViewTitle')
}

const initialState = {
  currentViewInfos: {},
  breadcrumbsInfo: [],
  relations: null,
  relationsInfo: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
