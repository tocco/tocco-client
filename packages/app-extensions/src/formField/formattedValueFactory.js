import React from 'react'
import {FormattedValue} from 'tocco-ui'

export default type => (formField, modelField, formName, value, info, events, formData) =>
  <output><FormattedValue type={type} value={value}/></output>
