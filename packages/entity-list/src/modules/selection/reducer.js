import {reducer as reducerUtil} from 'tocco-util'
import _uniq from 'lodash/uniq'

import * as actions from './actions'

const comparator = (a, b) => a - b

const setSelection = (state, {payload}) => ({
  ...state,
  selection: _uniq(payload.selection).sort(comparator)
})

const clearSelection = (state, {payload}) => ({
  ...state,
  selection: []
})

const ACTION_HANDLERS = {
  [actions.SET_SELECTION_MODE]: reducerUtil.singleTransferReducer('selectionMode'),
  [actions.SET_SELECTION]: setSelection,
  [actions.CLEAR_SELECTION]: clearSelection,
  [actions.SET_SHOW_SELECTION_CONTROLLER]: reducerUtil.singleTransferReducer('showSelectionController'),
  [actions.SET_TABLE_SELECTION_STYLE]: reducerUtil.singleTransferReducer('tableSelectionStyle')
}

const initialState = {
  selectionMode: 'selection',
  selection: [],
  showSelectionController: false,
  tableSelectionStyle: 'none'
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
