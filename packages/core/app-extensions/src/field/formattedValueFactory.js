import PropTypes from 'prop-types'
import {FormattedValue} from 'tocco-ui'

import formattedComponentConfigs from './formattedComponentConfigs'

const getOptions = (componentConfig, formField, formData) =>
  componentConfig?.getOptions ? componentConfig.getOptions({formField, formData}) : {}

const getValue = (componentConfig, formField, formData, value) =>
  componentConfig?.getValue ? componentConfig.getValue({formField, formData, value}) : value

const FormattedValueProvider = ({componentType, formField, value, formData, key, breakWords}) => {
  const dataType = formField.dataType || formField.componentType

  const componentConfig = formattedComponentConfigs[dataType]
  const options = getOptions(componentConfig, formField, formData)
  const actualValue = getValue(componentConfig, formField, formData, value)

  return <FormattedValue key={key} type={componentType} value={actualValue} options={options} breakWords={breakWords} />
}

FormattedValueProvider.propTypes = {
  componentType: PropTypes.string,
  formField: PropTypes.shape({
    dataType: PropTypes.string,
    componentType: PropTypes.string
  }),
  value: PropTypes.any,
  formData: PropTypes.object,
  key: PropTypes.string,
  breakWords: PropTypes.bool
}

const formattedValueFactory = componentType => props =>
  <FormattedValueProvider {...props} componentType={componentType} />

export default formattedValueFactory
