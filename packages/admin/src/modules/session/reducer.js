import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_LOGGED_IN]: reducerUtil.singleTransferReducer('loggedIn'),
  [actions.SET_USERNAME]: reducerUtil.singleTransferReducer('username'),
  [actions.SET_CURRENT_BUSINESS_UNIT]: reducerUtil.singleTransferReducer('currentBusinessUnit'),
  [actions.SET_BUSINESS_UNITS]: reducerUtil.singleTransferReducer('businessUnits'),
  [actions.SET_SSO_AVAILABLE]: reducerUtil.singleTransferReducer('ssoAvailable')
}

const initialState = {
  loggedIn: undefined,
  username: '',
  currentBusinessUnit: {
    label: '',
    id: ''
  },
  businessUnits: [],
  ssoAvailable: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
