import {SubmissionError} from 'redux-form/es/SubmissionError'
import {api, env} from 'tocco-util'

import rest from '../rest'
import formErrors from './formErrors'
import {formValuesToFlattenEntity, getDirtyFormValues, validationErrorToFormError} from './reduxForm'
import {hasError} from './utils'
import {asyncTypeValidateField} from './validators/asyncValidation'

const OUTDATED_ENTITY_ERROR_CODE = 'OUTDATED_ENTITY'

const validateRequest = (formValues, initialValues, fieldDefinitions, formDefinition, mode) => {
  const dirtyFormValues = getDirtyFormValues(initialValues, formValues, mode === 'create')
  const flattenEntity = formValuesToFlattenEntity(dirtyFormValues, fieldDefinitions)

  const widgetConfigKey = env.getWidgetConfigKey()
  const entity = api.toEntity(flattenEntity)
  const options = {
    queryParams: {
      _validate: true,
      ...(widgetConfigKey ? {_widget_key: widgetConfigKey} : {})
    },
    method: mode === 'create' ? 'POST' : 'PATCH',
    headers: {'X-Client': 'rest'}, // client type REST does not use client questions, which would interrupt validation
    body: entity,
    acceptedStatusCodes: [400, 403],
    acceptedErrorCodes: [OUTDATED_ENTITY_ERROR_CODE]
  }

  const customEndpoint = mode === 'create' ? formDefinition?.createEndpoint : undefined
  const endpoint = customEndpoint || `entities/2.0/${entity.model}${entity.key ? `/${entity.key}` : ''}`
  return rest.simpleRequest(endpoint, options).then(resp => {
    const body = resp.body
    if (resp.status === 400 || resp.status === 403) {
      return {}
    }
    if (body.valid) {
      return {}
    }

    if (body.errorCode === OUTDATED_ENTITY_ERROR_CODE) {
      return formErrors.outdatedResponseToFormError(body, entity)
    }

    return validationErrorToFormError(entity, fieldDefinitions, body.errors)
  })
}

export const submitValidation = (formValues, initialValues, fieldDefinitions, formDefinition, mode) =>
  validateRequest(formValues, initialValues, fieldDefinitions, formDefinition, mode).then(errors => {
    if (hasError(errors)) {
      throw new SubmissionError(errors)
    }
  })

export const asyncValidation = async (formValues, initialValues, fieldDefinitions, formDefinition, mode) => {
  const typeValidationErrors = await asyncTypeValidateField(formValues, fieldDefinitions)
  if (hasError(typeValidationErrors)) {
    throw typeValidationErrors
  }

  const validateRequestErrors = await validateRequest(formValues, initialValues, fieldDefinitions, formDefinition, mode)
  if (hasError(validateRequestErrors)) {
    throw validateRequestErrors
  }
}
