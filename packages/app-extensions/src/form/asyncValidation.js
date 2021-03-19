import {SubmissionError} from 'redux-form/es/SubmissionError'
import {api} from 'tocco-util'
import _has from 'lodash/has'
import _get from 'lodash/get'

import rest from '../rest'
import validators from './validators'
import formErrors from './formErrors'
import {formValuesToFlattenEntity, getDirtyFields, validationErrorToFormError} from './reduxForm'

const hasError = errors => (
  errors && Object.keys(errors).length > 0
)

const localeValidation = async(values, fieldDefinitions) => {
  let errors = {}
  for (const fieldDefinition of fieldDefinitions) {
    const value = values[fieldDefinition.path]
    if (validators.valueDefined(value)) {
      for (const asyncValidatorKey in validators.asyncValidators) {
        if (_has(fieldDefinition, ['validation', asyncValidatorKey])) {
          const validatorValue = _get(fieldDefinition, ['validation', asyncValidatorKey])
          const validator = validators.asyncValidators[asyncValidatorKey]
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

const validateRequest = (formValues, initialValues, mode) => {
  const dirtyFields = getDirtyFields(initialValues, formValues)
  const flattenEntity = formValuesToFlattenEntity(formValues)
  const entity = api.toEntity(flattenEntity, dirtyFields)
  const options = {
    queryParams: {_validate: true},
    method: mode === 'create' ? 'POST' : 'PATCH',
    headers: {'X-Client-Questions': 'false'},
    body: entity
  }

  return rest.simpleRequest(`entities/2.0/${entity.model}${entity.key ? `/${entity.key}` : ''}`, options)
    .then(resp => resp.body)
    .then(body => {
      if (body.valid) {
        return {}
      }
      return validationErrorToFormError(entity, body.errors)
    })
}

export const submitValidation = (formValues, initialValues, mode) =>
  validateRequest(formValues, initialValues, mode)
    .then(errors => {
      if (hasError(errors)) {
        throw new SubmissionError(errors)
      }
    })

export const asyncValidation = async(formValues, initialValues, fieldDefinitions, mode) => {
  const localeValidationErrors = await localeValidation(formValues, fieldDefinitions)
  if (hasError(localeValidationErrors)) {
    throw localeValidationErrors
  }

  const validateRequestErrors = await validateRequest(formValues, initialValues, mode)
  if (hasError(validateRequestErrors)) {
    throw validateRequestErrors
  }
}
