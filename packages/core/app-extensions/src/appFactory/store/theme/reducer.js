import {reducer as reducerUtil} from 'tocco-util'

import * as actions from './actions'

// TODO: rename everything to themeType
const ACTION_HANDLERS = {
  [actions.SET_THEMETYPE]: reducerUtil.singleTransferReducer('themeType')
}

const initialState = {
  themeType: 'light'
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
