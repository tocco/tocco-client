import React from 'react'
import {EditableValue, Range} from 'tocco-ui'

import typeEditable from './typeEditable'

const getEvents = (type, formField, formName, formData, events) =>
  typeEditable[type] && typeEditable[type].getEvents
    ? typeEditable[type].getEvents({formField, formName, formData, events})
    : events

const getValue = (type, formField, modelField, formName, formData, currentValue) =>
  typeEditable[type] && typeEditable[type].getValue
    ? typeEditable[type].getValue({formField, modelField, formName, formData, currentValue})
    : currentValue

const getOptions = (type, formField, modelField, formName, formData) =>
  typeEditable[type] && typeEditable[type].getOptions
    ? typeEditable[type].getOptions({formField, modelField, formName, formData})
    : {}

export default (type, range) => (formField, modelField, formName, value, info, events, formData) => {
  const formType = formField.dataType || formField.componentType
  const options = getOptions(formType, formField, modelField, formName, formData)

  events = getEvents(formType, formField, formName, formData, events)
  value = getValue(formType, formField, modelField, formName, formData, value)

  const Component = range ? Range : EditableValue

  return (
    <Component
      type={type}
      events={events}
      value={value}
      {...info}
      options={options}
    />
  )
}
