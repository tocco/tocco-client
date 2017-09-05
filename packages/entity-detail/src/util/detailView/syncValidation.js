import React from 'react'
import {FormattedMessage} from 'react-intl'
import _forOwn from 'lodash/forOwn'
import _isEmpty from 'lodash/isEmpty'

export default entityModel =>
  values => (
    valueValidator(
      values,
      [
        {validator: mandatoryValidator, selector: 'mandatory'},
        {validator: minLengthValidator, selector: 'minLength'},
        {validator: maxLengthValidator, selector: 'maxLength'}
      ],
      entityModel
    )
  )

const valueValidator = (values, validatorDefinitions, entityModel) => {
  let errors = {}

  const addErrors = (field, fieldErrors) => {
    if (fieldErrors && !_isEmpty(fieldErrors)) {
      errors = {
        ...errors,
        [field]: {
          ...errors[field],
          ...fieldErrors
        }
      }
    }
  }

  const getValidatorValue = (fieldName, selector) => {
    if (entityModel[fieldName]
      && entityModel[fieldName].validation) {
      return entityModel[fieldName].validation[selector]
    }
  }

  _forOwn(entityModel, value => {
    const fieldName = value.fieldName
    const fieldValue = values[fieldName]

    validatorDefinitions.forEach(validatorDefinition => {
      const validatorValue = getValidatorValue(fieldName, validatorDefinition.selector)
      if (validatorValue) {
        addErrors(fieldName, validatorDefinition.validator(fieldValue, validatorValue))
      }
    })
  })

  return errors
}

export const mandatoryValidator = (value, isMandatory) => {
  if (typeof value === 'number' && value === 0) {
    return
  }
  if (!value && isMandatory) {
    return {
      mandatory: [
        <FormattedMessage
          key="syncValidationRequired"
          id="client.entity-detail.syncValidationRequired"
        />
      ]
    }
  }
}

export const minLengthValidator = (value, minLength) => {
  if (value && value.length < minLength) {
    return {
      minLength: [
        <FormattedMessage
          key="syncValidationMinLength"
          id="client.entity-detail.syncValidationMinLength"
          values={{minLength}}
        />
      ]
    }
  }
}

export const maxLengthValidator = (value, maxLength) => {
  if (value && value.length > maxLength) {
    return {
      maxLength: [
        <FormattedMessage
          key="syncValidationMaxLength"
          id="client.entity-detail.syncValidationMaxLength"
          values={{maxLength}}
        />
      ]
    }
  }
}
