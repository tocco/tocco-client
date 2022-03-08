import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const setStage = stage => state => ({
  ...state,
  stage
})

const ACTION_HANDLERS = {
  [actions.SET_TWO_STEP_ACTIVE]: reducerUtil.singleTransferReducer('twoFactorActive'),
  [actions.SET_SECRET]: reducerUtil.singleTransferReducer('secret'),
  [actions.SET_USER_NAME]: reducerUtil.singleTransferReducer('username'),
  [actions.SET_SETUP_SUCCESSFUL]: reducerUtil.singleTransferReducer('setupSuccessful'),
  [actions.GO_TO_START]: setStage(0),
  [actions.GO_TO_SECRET]: setStage(1),
  [actions.GO_TO_SECRET_VERIFICATION]: setStage(2),
  [actions.GO_TO_RESULT]: setStage(3)
}

const initialState = {
  stage: null,
  twoFactorActive: null,
  secret: null,
  username: null,
  setupSuccessful: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
