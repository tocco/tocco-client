import _get from 'lodash/get'
import _has from 'lodash/has'

import formErrors from './formErrors'
import validators from './validators'

export default fieldDefinitions => values => {
  let errors = {}

  fieldDefinitions.forEach(fieldDefinition => {
    const value = values[fieldDefinition.path]

    if (validators.valueDefined(value)) {
      Object.keys(validators.syncValidators).forEach(syncValidatorKey => {
        if (_has(fieldDefinition, ['validation', ...syncValidatorKey.split('.')])) {
          const validatorValue = _get(fieldDefinition, ['validation', ...syncValidatorKey.split('.')])
          const validator = validators.syncValidators[syncValidatorKey]
          const validatorErrors = validator(value, validatorValue)
          if (validatorErrors) {
            errors = formErrors.addErrors(errors, fieldDefinition.path, validatorErrors)
          }
        }
      })
    } else {
      if (fieldDefinition.validation && fieldDefinition.validation.mandatory) {
        errors = formErrors.addErrors(errors, fieldDefinition.path, validators.mandatoryError)
      }
    }
  })

  return errors
}
