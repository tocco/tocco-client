import {v4 as uuid} from 'uuid'
import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const handleReceiveEntry = (state, {payload}) =>
  state.active
    ? {
        ...state,
        entries: [{
          ...payload.data,
          key: uuid()
        },
        ...state.entries]
      }
    : state

const ACTION_HANDLERS = {
  [actions.RECEIVE_ENTRY]: handleReceiveEntry,
  [actions.SET_ACTIVE]: reducerUtil.singleTransferReducer('active'),
  [actions.SET_ELAPSED]: reducerUtil.singleTransferReducer('elapsed')
}

const initialState = {
  entries: [],
  active: false,
  elapsed: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
