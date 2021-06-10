import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const addIgnoreToaster = (state, {payload: {key}}) => {
  return {
    ...state,
    ignoredToasters: [...new Set([...state.ignoredToasters, key])]
  }
}

const ACTION_HANDLERS = {
  [actions.SET_ORIGIN_ID]: reducerUtil.singleTransferReducer('originId'),
  [actions.ADD_IGNORE_TOASTER]: addIgnoreToaster
}

const initialState = {
  originId: null,
  ignoredToasters: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
