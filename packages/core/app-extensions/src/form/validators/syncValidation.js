import _get from 'lodash/get'
import _has from 'lodash/has'

import formErrors from '../formErrors'
import {mandatoryError, valueDefined} from './mandatory'
import syncTypeValidators from './syncTypeValidators'
import syncValidators from './syncValidators'

export const syncValidateField = (fieldDefinition, value) => {
  let errors = {}

  if (valueDefined(value)) {
    Object.keys(syncValidators).forEach(syncValidatorKey => {
      if (_has(fieldDefinition, ['validation', ...syncValidatorKey.split('.')])) {
        const validatorValue = _get(fieldDefinition, ['validation', ...syncValidatorKey.split('.')])
        const validator = syncValidators[syncValidatorKey]
        const validatorErrors = validator(value, validatorValue)
        if (validatorErrors) {
          errors = formErrors.addErrors(errors, fieldDefinition.path, validatorErrors)
        }
      }
    })
  } else {
    if (fieldDefinition.validation && fieldDefinition.validation.mandatory) {
      errors = formErrors.addErrors(errors, fieldDefinition.path, mandatoryError)
    }
  }
  return errors
}

export const syncTypeValidateField = (values, formDefinition, value, fieldDefinition) => {
  const type = fieldDefinition.dataType
  const validator = syncTypeValidators[type]
  if (validator) {
    return validator(value, fieldDefinition, formDefinition, values)
  }

  return {}
}
