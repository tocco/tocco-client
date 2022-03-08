import {reducer as reducerUtil} from 'tocco-util'

import {SET_SELECTION, SET_HANDLE_NOTIFICATIONS, SET_UPDATE_IN_PROGRESS} from './actions'

const initialState = {
  selection: null,
  handleNotifications: false,
  updateInProgress: false
}

const ACTION_HANDLERS = {
  [SET_SELECTION]: reducerUtil.singleTransferReducer('selection'),
  [SET_HANDLE_NOTIFICATIONS]: reducerUtil.singleTransferReducer('handleNotifications'),
  [SET_UPDATE_IN_PROGRESS]: reducerUtil.singleTransferReducer('updateInProgress')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
