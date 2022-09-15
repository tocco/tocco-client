import {SubmissionError} from 'redux-form/es/SubmissionError'
import {call} from 'redux-saga/effects'
import {form, rest} from 'tocco-app-extensions'
import {env} from 'tocco-util'

export function* updateEntity(entity, fieldDefinitions, paths = []) {
  const options = {
    method: 'PATCH',
    queryParams: {
      _paths: paths.join(',')
    },
    body: entity,
    acceptedErrorCodes: ['VALIDATION_FAILED'],
    acceptedStatusCodes: [404, 409]
  }
  const resource = `entities/2.0/${entity.model}/${entity.key}`
  const resp = yield call(rest.requestSaga, resource, options)

  if (resp.body.errorCode === 'VALIDATION_FAILED') {
    throw new SubmissionError(form.validationErrorToFormError(entity, fieldDefinitions, resp.body.errors))
  }

  if (resp.status === 409 && resp.body.information) {
    throw new rest.InformationError(resp.body.information)
  }

  return resp.body
}

const SUCCESSFUL_SAVED_STATUS = 201

export function* createEntity(entity, fieldDefinitions, formDefinition, paths = []) {
  const widgetConfigKey = env.getWidgetConfigKey()

  const options = {
    method: 'POST',
    queryParams: {
      _paths: paths.join(','),
      ...(widgetConfigKey ? {_widget_key: widgetConfigKey} : {})
    },
    body: entity,
    acceptedErrorCodes: ['VALIDATION_FAILED'],
    acceptedStatusCodes: [403, 409]
  }

  const resource = formDefinition?.createEndpoint || `entities/2.0/${entity.model}`
  const resp = yield call(rest.requestSaga, resource, options)

  if (resp.status === SUCCESSFUL_SAVED_STATUS) {
    const location = resp.headers.get('Location')
    const id = location.split('/').pop()
    return id
  } else {
    if (resp.body && resp.body.errorCode === 'VALIDATION_FAILED') {
      throw new SubmissionError(form.validationErrorToFormError(entity, fieldDefinitions, resp.body.errors))
    }

    if (resp.status === 403) {
      throw new rest.ForbiddenException()
    }

    if (resp.status === 409 && resp.body.information) {
      throw new rest.InformationError(resp.body.information)
    }

    throw new Error('unexpected error during save', resp)
  }
}
