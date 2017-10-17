import * as actions from './actions'
import {reducers} from 'tocco-util'

const updateRequestedCalendars = (state, {payload}) => ({
  ...state,
  requestedCalendars: {
    ...state.requestedCalendars,
    [payload.calendarType]: payload.ids
  }
})

const removeRequestedCalendar = (state, {payload}) => {
  const {id, calendarType} = payload

  const arr = state.requestedCalendars[calendarType]
  const index = arr.indexOf(id)

  return {
    ...state,
    requestedCalendars: {
      ...state.requestedCalendars,
      [calendarType]: [
        ...arr.slice(0, index),
        ...arr.slice(index + 1)
      ]
    }
  }
}

const ACTION_HANDLERS = {
  [actions.SET_CALENDAR_TYPES]: reducers.singleTransferReducer('calendarTypes'),
  [actions.SET_CALENDARS]: reducers.singleTransferReducer('calendars'),
  [actions.SET_DATE_RANGE]: reducers.singleTransferReducer('dateRange'),
  [actions.UPDATE_REQUESTED_CALENDARS]: updateRequestedCalendars,
  [actions.REMOVE_REQUESTED_CALENDAR]: removeRequestedCalendar
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
