import React from 'react'
import {FormattedValue} from 'tocco-ui'

import formattedTypeConfigs from './formattedTypeConfigs'

const getOptions = (formField, modelField, formData) => {
  return formattedTypeConfigs[formField.dataType] && formattedTypeConfigs[formField.dataType].getOptions
    ? formattedTypeConfigs[formField.dataType].getOptions({modelField, formField, formData})
    : {}
}

export default type => ({modelField, formField, value, formData, key, breakWords}) => {
  const options = getOptions(formField, modelField, formData)
  return <FormattedValue key={key} type={type} value={value} options={options} breakWords={breakWords}/>
}
