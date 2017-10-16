import * as actions from './actions'
import {reducers} from 'tocco-util'

const updateRequestedCalendars = (state, {payload}) => ({
  ...state,
  requestedCalendars: {
    ...state.requestedCalendars,
    [payload.calendarType]: payload.ids
  }
})

const ACTION_HANDLERS = {
  [actions.SET_CALENDAR_TYPES]: reducers.singleTransferReducer('calendarTypes'),
  [actions.SET_CALENDARS]: reducers.singleTransferReducer('calendars'),
  [actions.SET_DATE_RANGE]: reducers.singleTransferReducer('dateRange'),
  [actions.UPDATE_REQUESTED_CALENDARS]: updateRequestedCalendars
}

const initialState = {
  calendarTypes: [],
  requestedCalendars: {},
  calendars: [],
  dateRange: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
