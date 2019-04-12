import React from 'react'
import PropTypes from 'prop-types'
import {EditableValue} from 'tocco-ui'

import typeEditable from './typeEditable'
import FormDataContainer from '../formData/FormDataContainer'

const EditableValueWrapper = ({type, formField, modelField, formName, value, info, events, formData}) => {
  const options = getOptions(type, formField, modelField, formData, formName)

  events = getEvents(type, formField, events, formData, formName)
  value = getValue(type, formField, value, modelField, formData, formName)

  return <EditableValue type={type} events={events} value={value} {...info} options={options}/>
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

export default type =>
  (formField, modelField, formName, value, info, events) => {
    let requestedProps
    if (typeEditable[type] && typeEditable[type].dataContainerProps) {
      requestedProps = typeEditable[type].dataContainerProps({type, formField, modelField, formName})
    }

    return <FormDataContainer {...requestedProps}>
      <EditableValueWrapper
        type={type}
        formField={formField}
        modelField={modelField}
        formName={formName}
        info={info}
        value={value}
        events={events}
      />
    </FormDataContainer>
  }

const getEvents = (type, formField, events, formData, formName) =>
  typeEditable[type] && typeEditable[type].getEvents
    ? typeEditable[type].getEvents({type, events, formField, formData, formName})
    : events

const getValue = (type, formField, currentValue, modelField, formData, formName) =>
  typeEditable[type] && typeEditable[type].getValue
    ? typeEditable[type].getValue({type, currentValue, formField, modelField, formData, formName})
    : currentValue

const getOptions = (type, formField, modelField, formData, formName) =>
  typeEditable[type] && typeEditable[type].getOptions
    ? typeEditable[type].getOptions({type, formField, modelField, formData, formName})
    : {}
