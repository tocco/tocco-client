import {SubmissionError} from 'redux-form'
import {form, rest} from 'tocco-app-extensions'
import _get from 'lodash/get'
import {api} from 'tocco-util'

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

const validateRequest = (formValues, initialValues, mode) => {
  const dirtyFields = form.getDirtyFields(initialValues, formValues)
  const flattenEntity = form.formValuesToFlattenEntity(formValues)
  const entity = api.toEntity(flattenEntity, dirtyFields)
  const options = {
    queryParams: {_validate: true},
    method: mode === modes.CREATE ? 'POST' : 'PATCH',
    body: entity
  }

  return rest.simpleRequest(`entities/2.0/${entity.model}${entity.key ? `/${entity.key}` : ''}`, options)
    .then(resp => resp.body)
    .then(body => {
      if (body.valid) {
        return {}
      }
      return form.validationErrorToFormError(entity, body.errors)
    })
}

export const submitValidate = (formValues, initialValues, entityModel, mode) => {
  return validateRequest(formValues, initialValues, mode)
    .then(errors => {
      if (hasError(errors)) {
        throw new SubmissionError(errors)
      }
    })
}

export const asyncValidate = async(formValues, initialValues, entityModel, mode) => {
  const typeValidationErrors = await asyncValidateTypes(formValues, entityModel)

  if (hasError(typeValidationErrors)) {
    throw new AsyncValidationException(typeValidationErrors)
  }

  const validateRequestErrors = await validateRequest(formValues, initialValues, mode)
  if (hasError(validateRequestErrors)) {
    throw new AsyncValidationException(validateRequestErrors)
  }
}
