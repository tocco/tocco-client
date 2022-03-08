import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

export const saveUserPreferences = (state, {payload}) => ({
  ...state,
  userPreferences: {
    ...state.userPreferences,
    ...payload.preferences
  }
})

const ACTION_HANDLERS = {
  [actions.SET_SERVER_SETTINGS]: reducerUtil.singleTransferReducer('serverSettings'),
  [actions.SET_USER_PREFERENCES]: reducerUtil.singleTransferReducer('userPreferences'),
  [actions.SAVE_USER_PREFERENCES]: saveUserPreferences
}

const initialState = {
  serverSettings: {},
  userPreferences: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
