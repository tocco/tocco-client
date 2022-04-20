export const SET_CALENDAR_TYPES = 'resourceScheduler/SET_CALENDAR_TYPES'
export const LOAD_CALENDAR_TYPES = 'resourceScheduler/LOAD_CALENDAR_TYPES'
export const INITIALIZE = 'resourceScheduler/INITIALIZE'
export const SEARCH_SELECTION_CHANGED = 'resourceScheduler/SEARCH_SELECTION_CHANGED'
export const UPDATE_REQUESTED_CALENDARS = 'resourceScheduler/UPDATE_REQUESTED_CALENDARS'
export const LOAD_REQUESTED_CALENDARS = 'resourceScheduler/LOAD_REQUESTED_CALENDARS'
export const SET_CALENDARS = 'resourceScheduler/SET_CALENDARS'
export const SET_DATE_RANGE = 'resourceScheduler/SET_DATE_RANGE'
export const REMOVE_REQUESTED_CALENDAR = 'resourceScheduler/REMOVE_REQUESTED_CALENDAR'
export const REMOVE_ALL_CALENDARS = 'resourceScheduler/REMOVE_ALL_CALENDARS'
export const ON_EVENT_CLICK = 'resourceScheduler/ON_EVENT_CLICK'
export const ON_REFRESH = 'resourceScheduler/ON_REFRESH'
export const SET_HANDLE_NOTIFICATIONS = 'resourceScheduler/SET_HANDLE_NOTIFICATIONS'

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

export const searchSelectionChanged = (calendarType, ids) => ({
  type: SEARCH_SELECTION_CHANGED,
  payload: {
    calendarType,
    ids
  }
})

export const updateRequestedCalendars = (calendarType, ids) => ({
  type: UPDATE_REQUESTED_CALENDARS,
  payload: {
    calendarType,
    ids
  }
})

export const loadRequestedCalendars = (calendarType, selection) => ({
  type: LOAD_REQUESTED_CALENDARS,
  payload: {
    calendarType,
    selection
  }
})

export const setCalendars = calendars => ({
  type: SET_CALENDARS,
  payload: {
    calendars
  }
})

export const setDateRange = dateRange => ({
  type: SET_DATE_RANGE,
  payload: {
    dateRange
  }
})

export const removeRequestedCalendar = (entityModel, id) => ({
  type: REMOVE_REQUESTED_CALENDAR,
  payload: {
    entityModel,
    id
  }
})

export const removeAllCalendars = () => ({
  type: REMOVE_ALL_CALENDARS
})

export const onEventClick = (model, key) => ({
  type: ON_EVENT_CLICK,
  payload: {
    model,
    key
  }
})

export const onRefresh = () => ({
  type: ON_REFRESH
})

export const setHandleNotifications = handleNotifications => ({
  type: SET_HANDLE_NOTIFICATIONS,
  payload: {
    handleNotifications
  }
})
