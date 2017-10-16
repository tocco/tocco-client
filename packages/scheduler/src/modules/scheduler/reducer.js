import * as actions from './actions'
import {reducers} from 'tocco-util'

const ACTION_HANDLERS = {
  [actions.SET_CALENDARS]: reducers.singleTransferReducer('calendars')
}

const initialState = {
  calendars: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
