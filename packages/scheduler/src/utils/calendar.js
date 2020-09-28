import {color} from 'tocco-util'

import conflicts from './conflicts'

const getResourceId = (id, model) => id + model

export const getResources = calendars => {
  return calendars.map(calendar => ({
    title: calendar.label,
    id: getResourceId(calendar.key, calendar.model),
    entityKey: calendar.key,
    calendarType: calendar.calendarType,
    entityModel: calendar.model
  }))
}

const getOptimalTextColorClass = backgroundHexColor =>
  color.getContrastColor(backgroundHexColor, 'bright', 'dark')

export const getEvents = calendars =>
  calendars.reduce((accumulator, calendar) => (
    [
      ...accumulator,
      ...calendar.events.map(event => ({
        entity: event.source,
        resourceId: getResourceId(calendar.key, calendar.model),
        title: event.label,
        start: event.start,
        end: event.end,
        description: event.description,
        conflict: event.conflict,
        ...(event.color ? {backgroundColor: event.color} : {}),
        className: [
          ...(event.conflict === conflicts.EXISTING ? ['conflict'] : []),
          getOptimalTextColorClass(event.color)
        ]
      }))
    ]
  ), [])
