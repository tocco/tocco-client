import {put, call} from 'redux-saga/effects'
import {v4 as uuid} from 'uuid'

import errorLogging from '../../../errorLogging'
import rest from '../../../rest'
import notification from '../../../notification'

export default function* (definition, selection, parent, params) {
  const runAsync = definition.runInBackgroundTask
  const invokeFnc = runAsync ? invokeActionAsync : invokeActionSync

  return yield call(invokeFnc, definition, selection, parent, params)
}

export function* invokeActionAsync(definition, selection, parent, params) {
  const response = yield call(rest.requestSaga, definition.endpoint, {
    method: 'POST',
    body: {
      entity: selection.entityName,
      selection,
      parent,
      params: {
        background: true,
        ...params
      },
      formProperties: definition.properties
    },
    acceptedErrorCodes: ['VALIDATION_FAILED'],
    headers: {
      'X-Enable-Notifications': true
    }
  })

  if (response.body && response.body.success === false) {
    yield put(notification.toaster({
      type: 'error',
      title: 'client.common.unexpectedError',
      body: response.body.message || 'client.component.actions.errorText'
    }))
  }
}

export function* invokeActionSync(definition, selection, parent, params) {
  const randomId = uuid()
  const title = definition.progressMsg || 'client.component.actions.defaultProgressMessage'
  yield put(notification.blockingInfo(randomId, title))
  const response = yield call(invokeRequest, definition, selection, parent, params)
  yield put(notification.removeBlockingInfo(randomId))

  return {
    ...response,
    remoteEvents: [
      ...(response && response.success
        ? [{
            type: 'entity-update-event',
            payload: {
              parent,
              entities: [{entityName: selection.entityName}]
            }
          }]
        : []
      )
    ]
  }
}

export function* invokeRequest(definition, selection, parent, params) {
  try {
    const response = yield call(rest.requestSaga, definition.endpoint, {
      method: 'POST',
      body: {
        entity: selection.entityName,
        selection,
        parent,
        ...params,
        formProperties: definition.properties
      },
      acceptedErrorCodes: ['VALIDATION_FAILED']
    })
    if (response.body && response.body.errorCode === 'VALIDATION_FAILED') {
      yield put(
        notification.toaster(
          'error',
          'client.component.actions.validationError',
          validationErrorCompact(response.body.errors),
          'exclamation')
      )
    } else {
      const success = response.body.success === true
      const type = success ? 'success' : 'warning'
      const title = response.body.message || 'client.component.actions.successDefault'

      yield put(notification.toaster({type, title}))
    }

    return response.body
  } catch (error) {
    if (!(error instanceof rest.ClientQuestionCancelledException)) {
      yield put(errorLogging.logError(
        'client.common.unexpectedError',
        'client.component.actions.errorText',
        error
      ))
    }
  }
}

export const validationErrorCompact = errors => {
  for (const error of errors) {
    if (error.entityValidatorErrors) {
      return getFirstElement(error.entityValidatorErrors)[0]
    }

    if (error.paths) {
      return getFirstElement(getFirstElement(error.paths))[0]
    }
  }

  return null
}

const getFirstElement = obj => Object.keys(obj).length >= 1 ? obj[Object.keys(obj)[0]] : undefined
