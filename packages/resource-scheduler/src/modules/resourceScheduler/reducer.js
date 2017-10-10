import * as actions from './actions'
import {reducers} from 'tocco-util'

const addCalendars = (state, {payload}) => ({
  ...state,
  calendars: [...state.calendars, ...payload.calendars]
})

const ACTION_HANDLERS = {
  [actions.SET_CALENDAR_TYPES]: reducers.singleTransferReducer('calendarTypes'),
  [actions.ADD_CALENDARS]: addCalendars
}

const initialState = {
  calendarTypes: [],
  calendars: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
