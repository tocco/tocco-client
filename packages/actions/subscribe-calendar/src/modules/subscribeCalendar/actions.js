export const FETCH_CALENDAR_LINK = 'subscribeCalendar/FETCH_CALENDAR_LINK'
export const SET_CALENDAR_LINK = 'subscribeCalendar/SET_CALENDAR_LINK'
export const COPY_CALENDAR_LINK = 'subscribeCalendar/COPY_CALENDAR_LINK'

export const fetchCalendarLink = () => ({
  type: FETCH_CALENDAR_LINK
})

export const setCalendarLink = link => ({
  type: SET_CALENDAR_LINK,
  payload: {
    link
  }
})

export const copyCalendarLink = () => ({
  type: COPY_CALENDAR_LINK
})
