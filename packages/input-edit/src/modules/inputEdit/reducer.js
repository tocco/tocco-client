import {reducer as reducerUtil} from 'tocco-util'

import {SET_SELECTION, SET_VALIDATION, SET_HANDLE_NOTIFICATIONS} from './actions'

const initialState = {
  selection: null,
  validation: {},
  handleNotifications: false
}

const ACTION_HANDLERS = {
  [SET_SELECTION]: reducerUtil.singleTransferReducer('selection'),
  [SET_VALIDATION]: reducerUtil.singleTransferReducer('validation'),
  [SET_HANDLE_NOTIFICATIONS]: reducerUtil.singleTransferReducer('handleNotifications')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
