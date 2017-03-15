import {SubmissionError} from 'redux-form'
import {request} from 'tocco-util/src/rest'
import {formValuesToEntity, validationErrorToFormError, getDirtyFields} from './reduxForm'

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

const validateRequest = (values, dirtyFields) => {
  const entity = formValuesToEntity(values, dirtyFields)
  return request(`entities/${entity.model}/${entity.key}`, {_validate: true}, 'PATCH', entity)
    .then(resp => resp.body)
    .then(body => {
      if (body.valid) {
        return {}
      }
      return validationErrorToFormError(entity, body.errors)
    })
}

export const submitValidate = values => {
  return validateRequest(values)
    .then(errors => {
      if (hasError(errors)) {
        throw new SubmissionError(errors)
      }
    })
}

export const asyncValidate = (values, initialValues) => {
  const dirtyFields = getDirtyFields(initialValues, values)
  return validateRequest(values, dirtyFields)
    .then(errors => {
      if (hasError(errors)) {
        throw new AsyncValidationException(errors)
      }
    })
}
