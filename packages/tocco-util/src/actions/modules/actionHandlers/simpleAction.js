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

    const type = success ? 'success' : 'warning'
    const title = response.body.message || 'client.component.actions.successDefault'
    const icon = success ? 'check' : 'exclamation'

    yield put(notifier.info(type, title, null, icon))
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
