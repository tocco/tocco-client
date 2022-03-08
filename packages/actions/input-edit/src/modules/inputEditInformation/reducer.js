import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const initialState = {
  information: []
}

const ACTION_HANDLERS = {
  [actions.SET_INFORMATION]: reducerUtil.singleTransferReducer('information')
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
