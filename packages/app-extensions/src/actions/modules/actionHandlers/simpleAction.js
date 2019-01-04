import errorLogging from '../../../errorLogging'
import rest from '../../../rest'
import notifier from '../../../notifier'

import {put, call} from 'redux-saga/effects'

export default function* (definition, entity, selection, parent, params) {
  const randomId = Math.random()
  const title = definition.progressMsg || 'client.component.actions.defaultProgressMessage'
  yield put(notifier.blockingInfo(randomId, title))
  const response = yield call(invokeRequest, definition, entity, selection, parent, params)
  yield put(notifier.removeBlockingInfo(randomId))
  return response
}

export function* invokeRequest(definition, entity, selection, parent, params) {
  try {
    const response = yield call(rest.requestSaga, definition.endpoint, {
      method: 'POST',
      body: {
        entity,
        mode: selection.mode,
        payload: selection.payload,
        parent,
        ...params
      },
      acceptedErrorCodes: ['VALIDATION_FAILED']
    })
    if (response.body && response.body.errorCode === 'VALIDATION_FAILED') {
      yield put(
        notifier.info('error', 'client.component.actions.validationError', validationErrorCompact(response.body.errors),
          'exclamation')
      )
    } else {
      const success = response.body.success === true
      const type = success ? 'success' : 'warning'
      const title = response.body.message || 'client.component.actions.successDefault'
      const icon = success ? 'check' : 'exclamation'

      yield put(notifier.info(type, title, null, icon, 3000))
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
