import React from 'react'
import PropTypes from 'prop-types'
import {EditableValue, Range} from 'tocco-ui'

import editableTypeConfigs from './editableTypeConfigs'

const getEvents = (type, formField, formName, formData, events) =>
  editableTypeConfigs[type] && editableTypeConfigs[type].getEvents
    ? editableTypeConfigs[type].getEvents({formField, formName, formData, events})
    : events

const getValue = (type, formField, formName, formData, currentValue) =>
  editableTypeConfigs[type] && editableTypeConfigs[type].getValue
    ? editableTypeConfigs[type].getValue({formField, formName, formData, currentValue})
    : currentValue

const getOptions = (type, formField, formName, formData) =>
  editableTypeConfigs[type] && editableTypeConfigs[type].getOptions
    ? editableTypeConfigs[type].getOptions({formField, formName, formData})
    : {}

const EditableValueFactory = ({type, range, formField, formName, value, info, events, formData}) => {
  const formType = formField.dataType || formField.componentType
  const options = getOptions(formType, formField, formName, formData)

  events = getEvents(formType, formField, formName, formData, events)
  value = getValue(formType, formField, formName, formData, value)

  const Component = range ? Range : EditableValue

  return (
    <Component
      type={type}
      events={events}
      value={value}
      {...info}
      options={options}
      {...(range && {
        fromText: formData.intl.formatMessage({id: 'client.component.range.from'}),
        toText: formData.intl.formatMessage({id: 'client.component.range.to'})
      })}
    />
  )
}

EditableValueFactory.propTypes = {
  type: PropTypes.string,
  range: PropTypes.bool,
  formName: PropTypes.string,
  formField: PropTypes.shape({
    dataType: PropTypes.string,
    componentType: PropTypes.string
  }),
  value: PropTypes.any,
  info: PropTypes.object,
  events: PropTypes.object,
  formData: PropTypes.object
}

export default (type, range) => props => <EditableValueFactory type={type} range={range} {...props}/>
