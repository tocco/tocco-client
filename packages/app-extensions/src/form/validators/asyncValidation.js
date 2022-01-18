import _get from 'lodash/get'
import _has from 'lodash/has'

import formErrors from '../formErrors'
import asyncTypeValidators from './asyncTypeValidators'
import {valueDefined} from './mandatory'

export const asyncTypeValidateField = async(values, fieldDefinitions) => {
  let errors = {}
  for (const fieldDefinition of fieldDefinitions) {
    const value = values[fieldDefinition.path]
    if (valueDefined(value)) {
      for (const asyncValidatorKey in asyncTypeValidators) {
        if (_has(fieldDefinition, ['validation', asyncValidatorKey])) {
          const validatorValue = _get(fieldDefinition, ['validation', asyncValidatorKey])
          const validator = asyncTypeValidators[asyncValidatorKey]
          const validatorErrors = await validator(value, validatorValue)
          if (validatorErrors) {
            errors = formErrors.addErrors(errors, fieldDefinition.path, validatorErrors)
          }
        }
      }
    }
  }
  return errors
}
