import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_REPORTS]: reducerUtil.singleTransferReducer('reports'),
  [actions.SET_SELECTED_REPORT]: reducerUtil.singleTransferReducer('selectedReport')
}

const initialState = {
  reports: null,
  selectedReport: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
