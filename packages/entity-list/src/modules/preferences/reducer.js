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
  ...state,
  positions: {},
  sorting: [],
  columns: {}
})

const ACTION_HANDLERS = {
  [actions.SET_POSITIONS]: reducerUtil.singleTransferReducer('positions'),
  [actions.SET_SORTING]: reducerUtil.singleTransferReducer('sorting'),
  [actions.SET_COLUMNS]: reducerUtil.singleTransferReducer('columns'),
  [actions.SET_PREFERENCES_LOADED]: reducerUtil.singleTransferReducer('preferencesLoaded'),
  [actions.RESET_SORTING]: resetSorting,
  [actions.RESET_COLUMNS]: resetColumns,
  [actions.RESET_PREFERENCES]: resetPreferences
}

const initialState = {
  positions: {},
  sorting: [],
  columns: {},
  preferencesLoaded: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
