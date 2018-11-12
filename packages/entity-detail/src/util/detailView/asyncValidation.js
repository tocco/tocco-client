import {SubmissionError} from 'redux-form'
import {form, rest} from 'tocco-app-extensions'

import modes from '../modes'

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

export const asyncValidate = (values, initialValues, entityName, entityId, entityModel, mode) => {
  return validateRequest(values, initialValues, entityName, entityId, entityModel, mode)
    .then(errors => {
      if (hasError(errors)) {
        throw new AsyncValidationException(errors)
      }
    })
}
