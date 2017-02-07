import {SubmissionError} from 'redux-form'
import {request} from 'tocco-util/src/rest'
import {formValuesToEntity} from './reduxForms'

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

const validateRequest = values => {
  const entity = formValuesToEntity(values)
  return request(`entities/${entity.model}/${entity.key}/validate`, {}, 'POST', entity)
    .then(resp => resp.body)
    .then(json => json.fields)
}

export const submitValidate = values => {
  return validateRequest(values)
    .then(errors => {
      if (hasError(errors)) {
        throw new SubmissionError(errors)
      }
    })
}

export const asyncValidate = values => {
  return validateRequest(values)
    .then(errors => {
      if (hasError(errors)) {
        throw new AsyncValidationException(errors)
      }
    })
}
