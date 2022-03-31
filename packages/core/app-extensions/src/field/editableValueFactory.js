import PropTypes from 'prop-types'
import {EditableValue, Range} from 'tocco-ui'

import editableTypeConfigs from './editableTypeConfigs'

const getEvents = (typeConfig, formField, formName, formData, events) =>
  typeConfig && typeConfig.getEvents ? typeConfig.getEvents({formField, formName, formData, events}) : events

const getValue = (typeConfig, formField, formName, formData, currentValue) =>
  typeConfig && typeConfig.getValue ? typeConfig.getValue({formField, formName, formData, currentValue}) : currentValue

const getOptions = (typeConfig, formField, formName, formData) =>
  typeConfig && typeConfig.getOptions ? typeConfig.getOptions({formField, formName, formData}) : {}

const EditableValueFactory = ({type, range, formField, formName, value, info, events, formData}) => {
  const formType = formField.dataType || formField.componentType
  const typeConfig = editableTypeConfigs[type] || editableTypeConfigs[formType]
  const options = getOptions(typeConfig, formField, formName, formData)

  events = getEvents(typeConfig, formField, formName, formData, events)
  value = getValue(typeConfig, formField, formName, formData, value)

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

export default (type, range) => props => <EditableValueFactory type={type} range={range} {...props} />
