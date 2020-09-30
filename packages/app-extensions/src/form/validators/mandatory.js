import React from 'react'
import {FormattedMessage} from 'react-intl'

export const valueDefined = value => !(
  value === null
  || value === undefined
  || (Array.isArray(value) && value.length === 0)
  || (typeof value === 'object' && Object.keys(value).length === 0)
)

export const mandatoryError = {
  mandatory: [
    <FormattedMessage
      key="syncValidationRequired"
      id="client.component.form.syncValidationRequired"
    />
  ]
}
