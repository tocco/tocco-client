import PropTypes from 'prop-types'
import {EditableValue, Range} from 'tocco-ui'

import editableComponentConfigs from './editableComponentConfigs'

const getOptions = (componentConfig, formField, formName, formData) =>
  componentConfig?.getOptions ? componentConfig.getOptions({formField, formName, formData}) : {}

const getValue = (componentConfig, formField, formName, formData, value) =>
  componentConfig?.getValue ? componentConfig.getValue({formField, formName, formData, value}) : value

const getEvents = (componentConfig, formField, formName, formData, events) =>
  componentConfig?.getEvents ? componentConfig.getEvents({formField, formName, formData, events}) : events

const EditableValueProvider = ({componentType, range, formField, formName, value, info, events, formData}) => {
  const dataType = formField.dataType || formField.componentType

  const componentConfig = editableComponentConfigs[componentType] || editableComponentConfigs[dataType]
  const options = getOptions(componentConfig, formField, formName, formData)
  const actualValue = getValue(componentConfig, formField, formName, formData, value)
  const actualEvents = getEvents(componentConfig, formField, formName, formData, events)

  const Component = range ? Range : EditableValue

  return (
    <Component
      type={componentType}
      events={actualEvents}
      value={actualValue}
      {...info}
      options={options}
      {...(range && {
        fromText: formData.intl.formatMessage({id: 'client.component.range.from'}),
        toText: formData.intl.formatMessage({id: 'client.component.range.to'})
      })}
    />
  )
}

EditableValueProvider.propTypes = {
  componentType: PropTypes.string,
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

const editableValueFactory = (componentType, range) => props =>
  <EditableValueProvider componentType={componentType} range={range} {...props} />

export default editableValueFactory
