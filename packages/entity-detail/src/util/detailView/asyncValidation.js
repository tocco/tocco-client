import {SubmissionError} from 'redux-form'
import {form, rest} from 'tocco-app-extensions'
import _get from 'lodash/get'

import modes from '../modes'

const {asyncValidators} = form.validators

export class AsyncValidationException {
  constructor(errors) {
    this.name = 'AsyncValidationException'
    this.errors = errors
  }
}
AsyncValidationException.prototype = Object.create(Error.prototype)

const hasError = errors => (
  errors && Object.keys(errors).length > 0
)

export const asyncValidateTypes = async(values, entityModel) => {
  let errors = {}
  for (const key in values) {
    const value = values[key]
    if (value) {
      const type = _get(entityModel, key + '.type')
      const typeValidator = asyncValidators[type]
      if (typeValidator) {
        const fieldModel = entityModel[key]
        const validationError = await typeValidator(value, fieldModel)

        if (validationError) {
          const error = form.formErrorsUtil.addErrors(errors, key, validationError)
          errors = {...errors, ...error}
        }
      }
    }
  }

  return errors
}

const validateRequest = (values, initialValues, entityName, entityId, entityModel, mode) => {
  const dirtyFields = form.getDirtyFields(initialValues, values)
  const entity = form.formValuesToEntity(values, dirtyFields, entityName, entityId, entityModel)
  const options = {
    queryParams: {_validate: true},
    method: mode === modes.CREATE ? 'POST' : 'PATCH',
    body: entity
  }

  return rest.simpleRequest(`entities/${entity.model}${entity.key ? `/${entity.key}` : ''}`, options)
    .then(resp => resp.body)
    .then(body => {
      if (body.valid) {
        return {}
      }
      return form.validationErrorToFormError(entity, body.errors)
    })
}

export const submitValidate = (values, initialValues, entityName, entityId, entityModel, mode) => {
  return validateRequest(values, initialValues, entityName, entityId, entityModel, mode)
    .then(errors => {
      if (hasError(errors)) {
        throw new SubmissionError(errors)
      }
    })
}

export const asyncValidate = async(values, initialValues, entityName, entityId, entityModel, mode) => {
  const typeValidationErrors = await asyncValidateTypes(values, entityModel)

  if (hasError(typeValidationErrors)) {
    throw new AsyncValidationException(typeValidationErrors)
  }

  const validateRequestErrors = await validateRequest(values, initialValues, entityName, entityId, entityModel, mode)
  if (hasError(validateRequestErrors)) {
    throw new AsyncValidationException(validateRequestErrors)
  }
}
