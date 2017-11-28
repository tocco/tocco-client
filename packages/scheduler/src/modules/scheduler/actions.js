export const SET_CALENDARS = 'scheduler/SET_CALENDARS'
export const ON_DATE_RANGE_CHANGE = 'scheduler/ON_DATE_RANGE_CHANGE'
export const ON_CALENDAR_REMOVE = 'scheduler/ON_CALENDAR_REMOVE'
export const ON_EVENT_CLICK = 'scheduler/ON_EVENT_CLICK'

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
  type: ON_CALENDAR_REMOVE,
  payload: {
    id,
    calendarType
  }
})

export const onEventClick = event => ({
  type: ON_EVENT_CLICK,
  payload: {
    event
  }
})
