import React from 'react'
import {FormattedValue} from 'tocco-ui'

export default type => (formField, modelField, formName, properties, events, utils) =>
  <output><FormattedValue type={type} value={properties.value}/></output>
