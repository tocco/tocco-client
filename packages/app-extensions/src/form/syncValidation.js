import _has from 'lodash/has'
import _get from 'lodash/get'

import validators from './validators'
import formErrors from './formErrors'

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
