import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_DASHBOARD]: reducerUtil.singleTransferReducer('infoBoxes')
}

const initialState = {
  infoBoxes: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
