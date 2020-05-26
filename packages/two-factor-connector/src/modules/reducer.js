import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_TWO_STEP_ACTIVE]: reducerUtil.singleTransferReducer('twoFactorActive'),
  [actions.SET_SECRET]: reducerUtil.singleTransferReducer('secret'),
  [actions.SET_USER_NAME]: reducerUtil.singleTransferReducer('username')
}

const initialState = {
  twoFactorActive: null,
  secret: null,
  username: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
