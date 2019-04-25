import React from 'react'
import PropTypes from 'prop-types'
import {EditableValue} from 'tocco-ui'

import typeEditable from './typeEditable'
import FormDataContainer from '../formData/FormDataContainer'

const EditableValueWrapper = ({type, formField, modelField, formName, value, info, events, formData}) => {
  const options = getOptions(type, formField, modelField, formName, formData)

  events = getEvents(type, formField, formName, formData, events)
  value = getValue(type, formField, modelField, formName, formData, value)

  return (
    <EditableValue
      type={type}
      events={events}
      value={value}
      {...info}
      options={options}
    />
  )
}

EditableValueWrapper.propTypes = {
  type: PropTypes.string,
  formName: PropTypes.string,
  formField: PropTypes.object,
  modelField: PropTypes.object,
  events: PropTypes.object,
  info: PropTypes.object,
  value: PropTypes.any,
  formData: PropTypes.object
}

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

export default type => (formField, modelField, formName, value, info, events) => {
  let requestedProps
  if (typeEditable[type] && typeEditable[type].dataContainerProps) {
    requestedProps = typeEditable[type].dataContainerProps({formField, modelField, formName})
  }

  return (
    <FormDataContainer {...requestedProps}>
      <EditableValueWrapper
        type={type}
        formField={formField}
        modelField={modelField}
        formName={formName}
        value={value}
        info={info}
        events={events}
      />
    </FormDataContainer>
  )
}
