import React from 'react'
import {FormattedValue} from 'tocco-ui'

export default type => (formField, modelField, properties, events, utils) => {
  return <FormattedValue type={type} value={properties.value}/>
}
