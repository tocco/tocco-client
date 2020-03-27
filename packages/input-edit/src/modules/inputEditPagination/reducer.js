import {reducer as reducerUtil} from 'tocco-util'

import {SET_CURRENT_PAGE} from './actions'
import {SET_DATA} from '../inputEditTable/actions'

const initialState = {
  count: 0,
  currentPage: 1,
  recordsPerPage: 25
}

const setCount = (state, action) => {
  return {
    ...state,
    count: action.payload.count
  }
}

const ACTION_HANDLERS = {
  [SET_DATA]: setCount,
  [SET_CURRENT_PAGE]: reducerUtil.singleTransferReducer('currentPage')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
