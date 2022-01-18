import {SubmissionError} from 'redux-form/es/SubmissionError'
import {api} from 'tocco-util'

import rest from '../rest'
import formErrors from './formErrors'
import {formValuesToFlattenEntity, getDirtyFields, validationErrorToFormError} from './reduxForm'
import {hasError} from './utils'
import {asyncTypeValidateField} from './validators/asyncValidation'

const OUTDATED_ENTITY_ERROR_CODE = 'OUTDATED_ENTITY'

const validateRequest = (formValues, initialValues, mode) => {
  const dirtyFields = getDirtyFields(initialValues, formValues)
  const flattenEntity = formValuesToFlattenEntity(formValues)
  const entity = api.toEntity(flattenEntity, dirtyFields)
  const options = {
    queryParams: {_validate: true},
    method: mode === 'create' ? 'POST' : 'PATCH',
    headers: {'X-Client': 'rest'}, // client type REST does not use client questions, which would interrupt validation
    body: entity,
    acceptedStatusCodes: [403],
    acceptedErrorCodes: [OUTDATED_ENTITY_ERROR_CODE]
  }

  return rest.simpleRequest(`entities/2.0/${entity.model}${entity.key ? `/${entity.key}` : ''}`, options)
    .then(resp => {
      const body = resp.body
      if (resp.status === 403) {
        return {}
      }
      if (body.valid) {
        return {}
      }

      if (body.errorCode === OUTDATED_ENTITY_ERROR_CODE) {
        return formErrors.outdatedResponseToFormError(body, entity)
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
  const typeValidationErrors = await asyncTypeValidateField(formValues, fieldDefinitions)
  if (hasError(typeValidationErrors)) {
    throw typeValidationErrors
  }

  const validateRequestErrors = await validateRequest(formValues, initialValues, mode)
  if (hasError(validateRequestErrors)) {
    throw validateRequestErrors
  }
}
