export const SET_CALENDAR_TYPES = 'resourceScheduler/SET_CALENDAR_TYPES'
export const LOAD_CALENDAR_TYPES = 'resourceScheduler/LOAD_CALENDAR_TYPES'
export const INITIALIZE = 'resourceScheduler/INITIALIZE'

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
