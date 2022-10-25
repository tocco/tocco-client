import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_LOGGED_IN]: reducerUtil.singleTransferReducer('loggedIn'),
  [actions.SET_USERNAME]: reducerUtil.singleTransferReducer('username')
}

const initialState = {
  loggedIn: undefined,
  username: undefined
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
