export const FETCH_CALENDAR_LINKS = 'subscribeCalendar/FETCH_CALENDAR_LINKS'
export const SET_CALENDAR_LINKS = 'subscribeCalendar/SET_CALENDAR_LINKS'
export const COPY_CALENDAR_LINK = 'subscribeCalendar/COPY_CALENDAR_LINK'

export const fetchCalendarLinks = () => ({
  type: FETCH_CALENDAR_LINKS
})

export const setCalendarLinks = links => ({
  type: SET_CALENDAR_LINKS,
  payload: {
    links
  }
})

export const copyCalendarLink = link => ({
  type: COPY_CALENDAR_LINK,
  payload: {
    link
  }
})
