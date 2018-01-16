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

  const getValidatorValue = (fieldModel, selector) => {
    if (fieldModel.validation) {
      return fieldModel.validation[selector]
    }
  }

  const getValueSelector = fieldModel => fieldModel.type === 'relation' ? fieldModel.relationName : fieldModel.fieldName

  _forOwn(entityModel, fieldModel => {
    const valueSelector = getValueSelector(fieldModel)
    const fieldValue = values[valueSelector]

    validatorDefinitions.forEach(validatorDefinition => {
      const validatorValue = getValidatorValue(fieldModel, validatorDefinition.selector)
      if (validatorValue) {
        addErrors(valueSelector, validatorDefinition.validator(fieldValue, validatorValue))
      }
    })
  })

  return errors
}

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
}
