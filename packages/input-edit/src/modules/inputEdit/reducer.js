import {reducer as reducerUtil} from 'tocco-util'

import {SET_SELECTION, SET_VALIDATION} from './actions'

const initialState = {
  selection: null,
  validation: {}
}

const ACTION_HANDLERS = {
  [SET_SELECTION]: reducerUtil.singleTransferReducer('selection'),
  [SET_VALIDATION]: reducerUtil.singleTransferReducer('validation')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
