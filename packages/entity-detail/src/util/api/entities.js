import {SubmissionError} from 'redux-form'
import {form, rest} from 'tocco-app-extensions'
import {call} from 'redux-saga/effects'

export function* updateEntity(entity, paths = []) {
  const options = {
    method: 'PATCH',
    queryParams: {
      _paths: paths.join(',')
    },
    body: entity,
    acceptedErrorCodes: ['VALIDATION_FAILED']
  }
  const resource = `entities/2.0/${entity.model}/${entity.key}`
  const resp = yield call(rest.requestSaga, resource, options)

  if (resp.body.errorCode === 'VALIDATION_FAILED') {
    throw new SubmissionError(form.validationErrorToFormError(entity, resp.body.errors))
  }

  return resp.body
}

const SUCCESSFUL_SAVED_STATUS = 201

export function* createEntity(entity, paths = []) {
  const options = {
    method: 'POST',
    queryParams: {
      _paths: paths.join(',')
    },
    body: entity,
    acceptedErrorCodes: ['VALIDATION_FAILED']
  }
  const resource = `entities/2.0/${entity.model}`
  const resp = yield call(rest.requestSaga, resource, options)

  if (resp.status === SUCCESSFUL_SAVED_STATUS) {
    const location = resp.headers.get('Location')
    const id = location.split('/').pop()
    return id
  } else {
    if (resp.body && resp.body.errorCode === 'VALIDATION_FAILED') {
      throw new SubmissionError(form.validationErrorToFormError(entity, resp.body.errors))
    }

    throw new Error('unexpected error during save', resp)
  }
}
