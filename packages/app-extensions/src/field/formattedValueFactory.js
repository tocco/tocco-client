import React from 'react'
import PropTypes from 'prop-types'
import {FormattedValue} from 'tocco-ui'

import formattedTypeConfigs from './formattedTypeConfigs'

const getOptions = (fieldType, formField, formData) =>
  formattedTypeConfigs[fieldType] && formattedTypeConfigs[fieldType].getOptions
    ? formattedTypeConfigs[fieldType].getOptions({formField, formData})
    : {}

const getValue = (fieldType, formField, formData, value) =>
  formattedTypeConfigs[fieldType] && formattedTypeConfigs[fieldType].getValue
    ? formattedTypeConfigs[fieldType].getValue({formField, formData})
    : value

const FormattedValueFactory = ({type, formField, value, formData, key, breakWords}) => {
  const fieldType = formField.dataType || formField.componentType
  const options = getOptions(fieldType, formField, formData, value)
  const overwrittenValue = getValue(fieldType, formField, formData, value)

  return <FormattedValue key={key} type={type} value={overwrittenValue} options={options} breakWords={breakWords}/>
}

FormattedValueFactory.propTypes = {
  type: PropTypes.string,
  formField: PropTypes.shape({
    dataType: PropTypes.string,
    componentType: PropTypes.string
  }),
  value: PropTypes.any,
  formData: PropTypes.object,
  key: PropTypes.string,
  breakWords: PropTypes.bool
}

export default type => props => <FormattedValueFactory {...props} type={type}/>
