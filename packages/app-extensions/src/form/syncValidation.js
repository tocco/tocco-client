import _forOwn from 'lodash/forOwn'
import _get from 'lodash/get'

import validators from './validators'

export default entityModel =>
  values => (
    validate(
      values,
      entityModel
    )
  )

export const addErrors = (errors, field, fieldErrors) => (
  {
    ...errors,
    [field]:
      {
        ...(errors[field] || {}),
        ...(fieldErrors || {})
      }
  }
)

export const validate = (values, entityModel) => {
  let errors = {}

  errors = syncValidateModel(values, entityModel, errors)
  errors = syncValidateTypes(values, entityModel, errors)

  return errors
}

export const shouldUseSyncValidator = (values, type) => {
  const syncValidators = validators.syncValidators
  const validatorKeys = Object.keys(syncValidators)

  return validatorKeys.includes(type)
}

export const syncValidateTypes = (values, entityModel, errors) => {
  _forOwn(values, (value, key) => {
    if (value) {
      if (validators) {
        const type = _get(entityModel, key + '.type')
        if (shouldUseSyncValidator(values, type)) {
          const syncValidators = validators.syncValidators
          for (const validator in syncValidators) {
            if (syncValidators.hasOwnProperty(validator)) {
              const fieldModel = entityModel[key]
              const validatorError = syncValidators[validator](value, fieldModel)
              if (validatorError) {
                errors = addErrors(errors, key, validatorError)
              }
            }
          }
        }
      }
    }
  })

  return errors
}

export const syncValidateModel = (values, entityModel, errors) => {
  const getValidatorValue = (fieldModel, selector) => {
    if (fieldModel.validation) {
      return fieldModel.validation[selector]
    }
  }

  const getValueSelector = fieldModel => fieldModel.type === 'relation' ? fieldModel.relationName : fieldModel.fieldName

  _forOwn(entityModel, fieldModel => {
    const valueSelector = getValueSelector(fieldModel)
    const fieldValue = values[valueSelector]

    _forOwn(validators.modelValidators, (validator, name) => {
      const validatorValue = getValidatorValue(fieldModel, name)
      if (validatorValue) {
        const validatorErrors = validator(fieldValue, validatorValue)
        if (validatorErrors) {
          errors = addErrors(errors, valueSelector, validatorErrors)
        }
      }
    })
  })

  return errors
}
