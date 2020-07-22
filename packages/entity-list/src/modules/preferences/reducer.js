import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const resetSorting = state => {
  return {
    ...state,
    sorting: []
  }
}

const ACTION_HANDLERS = {
  [actions.SET_POSITIONS]: reducerUtil.singleTransferReducer('positions'),
  [actions.SET_SORTING]: reducerUtil.singleTransferReducer('sorting'),
  [actions.RESET_SORTING]: resetSorting
}

const initialState = {
  positions: null,
  sorting: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
