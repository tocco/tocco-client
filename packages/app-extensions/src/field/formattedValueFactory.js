import React from 'react'
import {FormattedValue} from 'tocco-ui'

import formattedTypeConfigs from './formattedTypeConfigs'

const getOptions = (type, modelField, formData) => {
  return formattedTypeConfigs[type] && formattedTypeConfigs[type].getOptions
    ? formattedTypeConfigs[type].getOptions({modelField, formData})
    : {}
}

export default type => ({modelField, formField, value, formData, key, breakWords}) => {
  const options = getOptions(formField.dataType, modelField, formData)
  return <FormattedValue key={key} type={type} value={value} options={options} breakWords={breakWords}/>
}
