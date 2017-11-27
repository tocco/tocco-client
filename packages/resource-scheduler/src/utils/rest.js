import _reduce from 'lodash/reduce'

export const transformRequestedCalendars = requestedCalendars =>
  _reduce(
    requestedCalendars,
    (result, keys, calendarTypeId) => [...result, {calendarTypeId, keys}],
    []
  )
