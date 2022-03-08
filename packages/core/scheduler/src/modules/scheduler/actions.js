export const SET_CALENDARS = 'scheduler/SET_CALENDARS'
export const ON_DATE_RANGE_CHANGE = 'scheduler/ON_DATE_RANGE_CHANGE'
export const ON_CALENDAR_REMOVE = 'scheduler/ON_CALENDAR_REMOVE'
export const ON_CALENDARS_REMOVE_ALL = 'scheduler/ON_CALENDARS_REMOVE_ALL'
export const ON_EVENT_CLICK = 'scheduler/ON_EVENT_CLICK'
export const ON_REFRESH = 'scheduler/ON_REFRESH'
export const REMOVE_EVENTS = 'scheduler/REMOVE_EVENTS'
export const SET_IS_LOADING = 'scheduler/SET_IS_LOADING'

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

export const onCalendarRemoveAll = () => ({
  type: ON_CALENDARS_REMOVE_ALL
})

export const onCalendarRemove = (id, entityModel) => ({
  type: ON_CALENDAR_REMOVE,
  payload: {
    id,
    entityModel
  }
})

export const onEventClick = event => ({
  type: ON_EVENT_CLICK,
  payload: {
    event
  }
})

export const onRefresh = () => ({
  type: ON_REFRESH
})

export const removeEvents = () => ({
  type: REMOVE_EVENTS
})

export const setIsLoading = isLoading => ({
  type: SET_IS_LOADING,
  payload: {
    isLoading
  }
})
