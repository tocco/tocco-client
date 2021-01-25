import React from 'react'
import {FormattedMessage} from 'react-intl'

const DEFAULT_DEFAULT_REGION = 'CH'
export const phoneValidator = async(value, phoneValidation = {}) => {
  const libphone = await import(/* webpackChunkName: "libphonenumber-js" */ 'libphonenumber-js')
  const isValidCustomRegex = phoneValidation.customRegex && value.match(phoneValidation.customRegex)
  const isValidPhoneNumber = libphone.isValidNumber(
    value,
    (phoneValidation.defaultRegion) || DEFAULT_DEFAULT_REGION
  )

  return (isValidCustomRegex || isValidPhoneNumber)
    ? null
    : {
        phone: [<FormattedMessage
        key="invalidPhoneNumber"
        id="client.component.form.invalidPhoneNumber"
      />
        ]
      }
}

export default {
  phone: phoneValidator
}
