import React from 'react'
import {FormattedValue} from 'tocco-ui'

const EMPTY_VALUE_PLACEHOLDER = '-'

export default type => (formField, modelField, properties, events, utils) => {
  const {value} = properties
  if (!value) return <span>{EMPTY_VALUE_PLACEHOLDER}</span>

  return <FormattedValue type={type} value={value}/>
}
