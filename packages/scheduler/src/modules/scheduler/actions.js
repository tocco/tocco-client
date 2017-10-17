export const SET_CALENDARS = 'scheduler/SET_CALENDARS'
export const ON_DATE_RANGE_CHANGE = 'scheduler/ON_DATE_RANGE_CHANGE'

export const setCalendars = calendars => ({
  type: SET_CALENDARS,
  payload: {
    calendars
  }
})
export const onDateRangeChange = dateRange => ({
  type: ON_DATE_RANGE_CHANGE,
  payload: {
    dateRange
  }
})
