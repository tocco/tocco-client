export const SET_CALENDARS = 'scheduler/SET_CALENDARS'
export const ON_DATE_RANGE_CHANGE = 'scheduler/ON_DATE_RANGE_CHANGE'
export const ON_CALENDAT_REMOVE = 'scheduler/ON_CALENDAT_REMOVE'

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

export const onCalendarRemove = (id, calendarType) => ({
  type: ON_CALENDAT_REMOVE,
  payload: {
    id,
    calendarType
  }
})
