import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.NAVIGATE]: reducerUtil.singleTransferReducer('path'),
  [actions.SET_PARAMS]: reducerUtil.singleTransferReducer('params')
}

const initialState = {
  path: '',
  params: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
