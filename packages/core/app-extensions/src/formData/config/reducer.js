import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_CONFIG_SELECTOR]: reducerUtil.singleTransferReducer('configSelector')
}

const initialState = {
  configSelector: () => ({})
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
