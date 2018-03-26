import {put, call} from 'redux-saga/effects'
import errorLogging from '../../../errorLogging'

import {ClientQuestionCancelledException, requestSaga} from '../../../rest'
import notifier from '../../../notifier'

export default function* (definition, entity, ids, params) {
  const randomId = Math.random()
  const title = definition.progressMsg || 'client.component.actions.defaultProgressMessage'
  yield put(notifier.blockingInfo(randomId, title, null, 'circle-o-notch fa-spin fa-fw'))
  const response = yield call(invokeRequest, definition, entity, ids, params)
  yield put(notifier.removeBlockingInfo(randomId))
  return response
}

export function* invokeRequest(definition, entity, ids, params) {
  try {
    const response = yield call(requestSaga, definition.endpoint, {
      method: 'POST',
      body: {ids, entity, ...params},
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

      yield put(notifier.info(type, title, null, icon))
    }

    return response.body
  } catch (error) {
    if (!(error instanceof ClientQuestionCancelledException)) {
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
