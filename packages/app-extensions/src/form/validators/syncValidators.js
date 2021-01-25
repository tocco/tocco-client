import React from 'react'
import {FormattedMessage} from 'react-intl'
import isEmail from 'validator/lib/isEmail'
import isUrl from 'validator/lib/isURL'

export const minLengthValidator = (value, minLength) =>
  value.length < minLength
    ? {
        minLength: [
        <FormattedMessage
          key="syncValidationMinLength"
          id="client.component.form.syncValidationMinLength"
          values={{minLength}}
        />
        ]
      }
    : null

export const minNumberValidator = (value, minValue) =>
  value < minValue
    ? {
        maxNumber: [
        <FormattedMessage
          key="syncValidationMaxNumber"
          id="client.component.form.syncValidationMinNumber"
          values={{minValue}}
        />
        ]
      }
    : null

export const maxLengthValidator = (value, maxLength) =>
  value.length > maxLength
    ? {
        maxLength: [
        <FormattedMessage
          key="syncValidationMaxLength"
          id="client.component.form.syncValidationMaxLength"
          values={{maxLength}}
        />
        ]
      }
    : null

export const maxNumberValidator = (value, maxValue) =>
  value > maxValue
    ? {
        maxNumber: [
        <FormattedMessage
          key="syncValidationMaxNumber"
          id="client.component.form.syncValidationMaxNumber"
          values={{maxValue}}
        />
        ]
      }
    : null

export const postPointValidator = (value, limit) =>
  value.toString().includes('.') && value.toString().split('.')[1].length > limit
    ? {
        prePoint: [
        <FormattedMessage
          key="syncValidationPrePoint"
          id="client.component.form.syncValidationPrePoint"
          values={{limit}}
        />
        ]
      }
    : null

export const prePointValidator = (value, limit) =>
  limit > 0 && value.toString().split('.')[0].length > limit
    ? {
        prePoint: [
        <FormattedMessage
          key="syncValidationPrePoint"
          id="client.component.form.syncValidationPrePoint"
          values={{limit}}
        />
        ]
      }
    : null

export const regexValidator = (value, pattern) =>
  !RegExp(pattern).test(value)
    ? {
        prePoint: [
        <FormattedMessage
          key="syncValidationRegexPattern"
          id="client.component.form.syncValidationRegexPattern"
          values={{pattern}}
        />
        ]
      }
    : null

export const emailValidator = value =>
  !isEmail(value)
    ? {
        format: [<FormattedMessage
        key="invalidEmail"
        id="client.component.form.invalidEmail"
      />
        ]

      }
    : null

export const urlValidator = value =>
  !isUrl(value)
    ? {
        format: [<FormattedMessage
        key="invalidUrl"
        id="client.component.form.invalidUrl"
      />
        ]
      }
    : null

export default {
  'length.fromIncluding': minLengthValidator,
  'length.toIncluding': maxLengthValidator,
  'numberRange.fromIncluding': minNumberValidator,
  'numberRange.toIncluding': maxNumberValidator,
  'decimalDigits.postPointDigits': postPointValidator,
  'decimalDigits.prePointDigits': prePointValidator,
  'regex.pattern': regexValidator,
  'email': emailValidator,
  'url': urlValidator
}
