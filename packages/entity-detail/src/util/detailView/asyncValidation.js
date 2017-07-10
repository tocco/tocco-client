import {SubmissionError} from 'redux-form'
import {simpleRequest} from 'tocco-util/src/rest'
import {formValuesToEntity, validationErrorToFormError, getDirtyFields} from 'tocco-util/src/form/reduxForm'

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

const validateRequest = (values, initialValues) => {
  const dirtyFields = getDirtyFields(initialValues, values)
  const entity = formValuesToEntity(values, dirtyFields)
  const options = {
    queryParams: {_validate: true},
    method: 'PATCH',
    body: entity
  }
  return simpleRequest(`entities/${entity.model}/${entity.key}`, options)
    .then(resp => resp.body)
    .then(body => {
      if (body.valid) {
        return {}
      }
      return validationErrorToFormError(entity, body.errors)
    })
}

export const submitValidate = (values, initialValues) => {
  return validateRequest(values, initialValues)
    .then(errors => {
      if (hasError(errors)) {
        throw new SubmissionError(errors)
      }
    })
}

export const asyncValidate = (values, initialValues) => {
  return validateRequest(values, initialValues)
    .then(errors => {
      if (hasError(errors)) {
        throw new AsyncValidationException(errors)
      }
    })
}
