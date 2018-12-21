import {SubmissionError} from 'redux-form'
import {form, rest} from 'tocco-app-extensions'
import _isEmpty from 'lodash/isEmpty'
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

export const asyncVerify = async(values, entityModel) => {
  let errors = {}

  errors = await asyncValidateTypes(values, entityModel, errors)

  return errors
}

export const shouldUseAsyncValidator = (values, type) => {
  const validatorKeys = Object.keys(asyncValidators)
  return validatorKeys.includes(type)
}

export const asyncValidateTypes = async(values, entityModel, errors) => {
  const errorArray = []
  for (const key in values) {
    if (values.hasOwnProperty(key)) {
      if (values[key]) {
        const type = _get(entityModel, key + '.type')

        if (shouldUseAsyncValidator(values, type)) {
          for (const validator in asyncValidators) {
            if (asyncValidators.hasOwnProperty(validator)) {
              const fieldModel = entityModel[key]
              const validationError = await asyncValidators[validator](values[key], fieldModel)

              if (validationError) {
                const error = form.addErrors(errors, key, validationError)
                errorArray.push(new Promise(resolve => resolve(error)))
              }
            }
          }
        }
      }
    }
  }
  return Promise.all(errorArray).then(value => {
    return value
  })
}

const validateRequest = (values, initialValues, entityName, entityId, entityModel, mode) => {
  const dirtyFields = form.getDirtyFields(initialValues, values)

  const entity = form.formValuesToEntity(values, dirtyFields, entityName, entityId, entityModel)
  const options = {
    queryParams: {_validate: true},
    method: mode === modes.CREATE ? 'POST' : 'PATCH',
    body: entity
  }

  return asyncVerify(values, entityModel)
    .then(errorObject => {
      if (_isEmpty(errorObject)) {
        return rest.simpleRequest(`entities/${entity.model}${entity.key ? `/${entity.key}` : ''}`, options)
      }
    })
    .then(resp => {
      if (!resp) {
        return {}
      }
      if (resp.body.valid) {
        return {}
      }
      return form.validationErrorToFormError(entity, resp.body.errors)
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
