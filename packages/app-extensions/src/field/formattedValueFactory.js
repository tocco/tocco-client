import React from 'react'
import {FormattedValue} from 'tocco-ui'

import formattedTypeConfigs from './formattedTypeConfigs'

const getOptions = (fieldType, formField, modelField, formData) =>
  formattedTypeConfigs[fieldType] && formattedTypeConfigs[fieldType].getOptions
    ? formattedTypeConfigs[fieldType].getOptions({modelField, formField, formData})
    : {}

const getValue = (fieldType, formField, modelField, formData, value) =>
  formattedTypeConfigs[fieldType] && formattedTypeConfigs[fieldType].getValue
    ? formattedTypeConfigs[fieldType].getValue({modelField, formField, formData})
    : value

export default type => ({modelField, formField, value, formData, key, breakWords}) => {
  const fieldType = formField.dataType || formField.componentType
  const options = getOptions(fieldType, formField, modelField, formData, value)
  const overwrittenValue = getValue(fieldType, formField, modelField, formData, value)

  return <FormattedValue key={key} type={type} value={overwrittenValue} options={options} breakWords={breakWords}/>
}
