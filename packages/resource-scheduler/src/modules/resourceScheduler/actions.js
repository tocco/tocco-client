export const SET_CALENDAR_TYPES = 'resourceScheduler/SET_CALENDAR_TYPES'
export const LOAD_CALENDAR_TYPES = 'resourceScheduler/LOAD_CALENDAR_TYPES'
export const INITIALIZE = 'resourceScheduler/INITIALIZE'
export const ADD_CALENDARS_OF_TYPE = 'resourceScheduler/ADD_CALENDARS_OF_TYPE'
export const ADD_CALENDARS = 'resourceScheduler/ADD_CALENDARS'

export const initialize = () => ({
  type: INITIALIZE
})

export const setCalendarTypes = calendarTypes => ({
  type: SET_CALENDAR_TYPES,
  payload: {
    calendarTypes
  }
})
export const loadCalendarTypes = () => ({
  type: LOAD_CALENDAR_TYPES
})

export const addCalendarsOfType = (calendarType, ids) => ({
  type: ADD_CALENDARS_OF_TYPE,
  payload: {
    calendarType,
    ids
  }
})
export const addCalendars = calendars => ({
  type: ADD_CALENDARS,
  payload: {
    calendars
  }
})
