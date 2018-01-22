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
    const response = yield call(requestSaga, definition.endpoint, {method: 'POST', body: {ids, entity, ...params}})

    const success = response.body.success === true

    yield put(notifier.info(
      success ? 'success' : 'warning',
      response.body.message || 'client.component.actions.successTitle',
      null,
      success ? 'check' : 'exclamation'
    ))
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
