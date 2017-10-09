import * as actions from './actions'
import {reducers} from 'tocco-util'

const ACTION_HANDLERS = {
  [actions.SET_CALENDAR_TYPES]: reducers.singleTransferReducer('calendarTypes')
}

const initialState = {
  calendarTypes: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
