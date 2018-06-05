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

const DEFAULT_DEFAUL_COUNTRY = 'CH'
export const phoneValidator = (value, fieldModel = {}) => {
  const isValidPhoneNumber = isValidNumber(value, (fieldModel.defaultCountry) || DEFAULT_DEFAUL_COUNTRY)

  const invalidPhoneError = {
    format: [<FormattedMessage
      key="invalidUrl"
      id="client.component.form.invalidPhoneNumber"
    />
    ]
  }

  if (fieldModel.customPhoneRegex) {
    return value.match(fieldModel.customPhoneRegex) ? null : invalidPhoneError
  } else if (!isValidPhoneNumber) {
    return invalidPhoneError
  }

  return null
}

export default {
  url: urlValidator,
  phone: phoneValidator
}
