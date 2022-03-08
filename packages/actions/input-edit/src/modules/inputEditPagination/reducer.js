import {reducer as reducerUtil} from 'tocco-util'

import {SET_CURRENT_PAGE, SET_TOTAL_COUNT} from './actions'

const initialState = {
  totalCount: 0,
  currentPage: 1,
  recordsPerPage: 25
}

const ACTION_HANDLERS = {
  [SET_TOTAL_COUNT]: reducerUtil.singleTransferReducer('totalCount'),
  [SET_CURRENT_PAGE]: reducerUtil.singleTransferReducer('currentPage')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
