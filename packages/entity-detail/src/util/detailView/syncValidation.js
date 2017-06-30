import _forOwn from 'lodash/forOwn'
import _isEmpty from 'lodash/isEmpty'

export default (entityModel, intl) =>
  values => (
    valueValidator(
      values,
      [
        {validator: mandatoryValidator, selector: 'mandatory'},
        {validator: minLengthValidator, selector: 'minLength'},
        {validator: maxLengthValidator, selector: 'maxLength'}
      ],
      entityModel,
      intl
    )
  )

const valueValidator = (values, validatorDefinitions, entityModel, intl) => {
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

  _forOwn(values, (value, key) => {
    validatorDefinitions.forEach(validatorDefinition => {
      const validatorValue = getValidatorValue(key, validatorDefinition.selector)
      if (validatorValue) {
        addErrors(key, validatorDefinition.validator(value, validatorValue, intl))
      }
    })
  })

  return errors
}

export const mandatoryValidator = (value, isMandatory, intl) => {
  if (typeof value === 'number' && value === 0) {
    return
  }
  if (!value && isMandatory) {
    return {
      mandatory: [intl.formatMessage({id: 'client.entity-detail.syncValidationRequired'})]
    }
  }
}

export const minLengthValidator = (value, minLength, intl) => {
  if (value && value.length < minLength) {
    return {
      minLength: [intl.formatMessage({id: 'client.entity-detail.syncValidationMinLength', values: {minLength}})]
    }
  }
}

export const maxLengthValidator = (value, maxLength, intl) => {
  if (value && value.length > maxLength) {
    return {
      maxLength: [intl.formatMessage({id: 'client.entity-detail.syncValidationMaxLength', values: {maxLength}})]
    }
  }
}
