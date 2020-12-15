import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const resetSorting = state => ({
  ...state,
  sorting: []
})

const resetColumns = state => ({
  ...state,
  positions: {},
  columns: {}
})

const resetPreferences = state => ({
  positions: {},
  sorting: [],
  columns: {}
})

const ACTION_HANDLERS = {
  [actions.SET_POSITIONS]: reducerUtil.singleTransferReducer('positions'),
  [actions.SET_SORTING]: reducerUtil.singleTransferReducer('sorting'),
  [actions.SET_COLUMNS]: reducerUtil.singleTransferReducer('columns'),
  [actions.RESET_SORTING]: resetSorting,
  [actions.RESET_COLUMNS]: resetColumns,
  [actions.RESET_PREFERENCES]: resetPreferences
}

const initialState = {
  positions: null,
  sorting: null,
  columns: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
