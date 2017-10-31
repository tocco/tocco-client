const getResourceId = (id, model) => id + model

export const getResources = calendars => {
  return calendars.map(calendar => ({
    title: calendar.label,
    id: getResourceId(calendar.key, calendar.model),
    entityKey: calendar.key,
    calendarType: calendar.calendarType
  }))
}

export const getEvents = calendars =>
  calendars.reduce((accumulator, calendar) => {
    return [
      ...accumulator,
      ...calendar.events.map(event => ({
        entity: event.source,
        resourceId: getResourceId(calendar.key, calendar.model),
        title: event.label,
        start: event.start,
        end: event.end,
        description: event.description
      }))
    ]
  }, [])
