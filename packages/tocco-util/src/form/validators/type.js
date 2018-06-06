import React from 'react'
import {FormattedMessage} from 'react-intl'
import isUrl from 'validator/lib/isURL'
import {isValidNumber} from 'libphonenumber-js'

export const urlValidator = value => {
  if (!isUrl(value)) {
    return {
      format: [<FormattedMessage
        key="invalidUrl"
        id="client.component.form.invalidUrl"
      />
      ]
    }
  }

  return null
}

const DEFAULT_DEFAULT_COUNTRY = 'CH'
export const phoneValidator = (value, fieldModel = {}) => {
  const isValidCustomRegex = fieldModel.customPhoneRegex && value.match(fieldModel.customPhoneRegex)
  const isValidPhoneNumber = isValidNumber(value, (fieldModel.defaultCountry) || DEFAULT_DEFAULT_COUNTRY)

  if (isValidCustomRegex || isValidPhoneNumber) {
    return null
  }

  return {
    format: [<FormattedMessage
      key="invalidUrl"
      id="client.component.form.invalidPhoneNumber"
    />
    ]
  }
}

export default {
  url: urlValidator,
  phone: phoneValidator
}
