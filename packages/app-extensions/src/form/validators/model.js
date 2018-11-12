import React from 'react'
import {FormattedMessage} from 'react-intl'
import _isEmpty from 'lodash/isEmpty'

export const mandatoryValidator = (value, isMandatory) => {
  if (!isMandatory) {
    return null
  }

  if (typeof value === 'number' && !isNaN(value)) {
    return null
  }

  if (!value || _isEmpty(value)) {
    return {
      mandatory: [
        <FormattedMessage
          key="syncValidationRequired"
          id="client.component.form.syncValidationRequired"
        />
      ]
    }
  }
  return null
}

export const minLengthValidator = (value, minLength) => {
  if (value && value.length < minLength) {
    return {
      minLength: [
        <FormattedMessage
          key="syncValidationMinLength"
          id="client.component.form.syncValidationMinLength"
          values={{minLength}}
        />
      ]
    }
  }

  return null
}

export const maxLengthValidator = (value, maxLength) => {
  if (value && value.length > maxLength) {
    return {
      maxLength: [
        <FormattedMessage
          key="syncValidationMaxLength"
          id="client.component.form.syncValidationMaxLength"
          values={{maxLength}}
        />
      ]
    }
  }

  return null
}

export const maxNumberValidator = (value, maxValue) => {
  if (value && value > maxValue) {
    return {
      maxNumber: [
        <FormattedMessage
          key="syncValidationMaxNumber"
          id="client.component.form.syncValidationMaxNumber"
          values={{maxValue}}
        />
      ]
    }
  }

  return null
}

export const postPointValidator = (value, limit) => {
  if (value !== null && value !== undefined) {
    const stringValue = value.toString()
    if (stringValue.includes('.')) {
      const decimalNumber = parseFloat(value.toString().split('.')[1])
      if (decimalNumber && (decimalNumber.toString().length > limit)) {
        return {
          postPoint: [
            <FormattedMessage
              key="syncValidationPostPoint"
              id="client.component.form.syncValidationPostPoint"
              values={{limit}}
            />
          ]
        }
      }
    }
  }

  return null
}

export default {
  mandatory: mandatoryValidator,
  minLength: minLengthValidator,
  maxLength: maxLengthValidator,
  maxNumber: maxNumberValidator,
  postPoint: postPointValidator
}
