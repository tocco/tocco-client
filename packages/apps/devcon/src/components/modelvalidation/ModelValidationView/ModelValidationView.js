import React from 'react'
import {Typography} from 'tocco-ui'

import CheckEvents from '../CheckEvents'
import ValidationProgress from '../ValidationProgress'

const ModelValidationView = () => (
  <>
    <Typography.H1>Model Validation</Typography.H1>
    <ValidationProgress />
    <CheckEvents />
  </>
)

export default ModelValidationView
