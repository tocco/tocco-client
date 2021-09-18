import React from 'react'
import {Typography} from 'tocco-ui'

import ValidationProgress from '../ValidationProgress'
import CheckEvents from '../CheckEvents'

const ModelValidationView = () => (
  <>
    <Typography.H1>Model Validation</Typography.H1>
    <ValidationProgress/>
    <CheckEvents/>
  </>
)

export default ModelValidationView
