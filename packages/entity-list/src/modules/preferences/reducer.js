import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const resetSorting = state => {
  return {
    ...state,
    sorting: initialState.sorting
  }
}

const resetColumns = state => {
  return {
    ...state,
    columns: initialState.columns,
    positions: initialState.positions
  }
}

const ACTION_HANDLERS = {
  [actions.SET_POSITIONS]: reducerUtil.singleTransferReducer('positions'),
  [actions.SET_SORTING]: reducerUtil.singleTransferReducer('sorting'),
  [actions.SET_COLUMNS]: reducerUtil.singleTransferReducer('columns'),
  [actions.RESET_SORTING]: resetSorting,
  [actions.RESET_COLUMNS]: resetColumns,
  [actions.RESET_PREFERENCES]: () => initialState
}

const initialState = {
  positions: null,
  sorting: [],
  columns: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
