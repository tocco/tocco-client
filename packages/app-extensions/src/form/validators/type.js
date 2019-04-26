import React from 'react'
import {FormattedMessage} from 'react-intl'
import isUrl from 'validator/lib/isURL'
import isEmail from 'validator/lib/isEmail'

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

export const emailValidator = value => {
  if (!isEmail(value)) {
    return {
      format: [<FormattedMessage
        key="invalidEmail"
        id="client.component.form.invalidEmail"
      />
      ]
    }
  }

  return null
}

const DEFAULT_DEFAULT_COUNTRY = 'CH'
export const phoneValidator = async(value, fieldModel = {}) => {
  const libphone = await import(/* webpackChunkName: "libphonenumber-js" */ 'libphonenumber-js')

  const isValidCustomRegex = fieldModel.customPhoneRegex && value.match(fieldModel.customPhoneRegex)
  const isValidPhoneNumber = libphone.isValidNumber(value, (fieldModel.defaultCountry) || DEFAULT_DEFAULT_COUNTRY)

  if (isValidCustomRegex || isValidPhoneNumber) {
    return null
  }

  return {
    format: [<FormattedMessage
      key="invalidPhoneNumber"
      id="client.component.form.invalidPhoneNumber"
    />
    ]
  }
}

export const syncValidators = {
  email: emailValidator,
  url: urlValidator
}

export const asyncValidators = {phone: phoneValidator}
