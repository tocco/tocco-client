import classNames from 'classnames'
import {color} from 'tocco-util'

const getResourceId = (id, model) => id + model

export const getResources = calendars => {
  return calendars.map(calendar => ({
    title: calendar.label,
    id: getResourceId(calendar.key, calendar.model),
    entityKey: calendar.key,
    calendarType: calendar.calendarType
  }))
}

const WHITE_RGB = {r: 255, g: 255, b: 255}
const getTextColor = hexColor => {
  const rgbColor = color.hexToRgb(hexColor, WHITE_RGB)
  return color.getContrastColor(rgbColor, 'bright', 'dark')
}

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
        className: classNames({conflict: event.conflict === 'existing'}, getTextColor(event.color))
      }))
    ]
  ), [])
