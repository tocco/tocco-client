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

const ACTION_HANDLERS = {
  [actions.CACHE_MODEL]: cacheModel,
  [actions.SET_CURRENT_VIEW_INFO]: reducerUtil.singleTransferReducer('currentViewInfo')
}

const initialState = {
  modelCache: {},
  currentViewInfo: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
