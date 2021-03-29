import {put, call} from 'redux-saga/effects'
import {download, validation} from 'tocco-util'

import errorLogging from '../../../errorLogging'
import rest from '../../../rest'
import notifier from '../../../notifier'

export default function* (definition, selection, parent, params) {
  const randomId = Math.random()
  const title = definition.progressMsg || 'client.component.actions.defaultProgressMessage'
  yield put(notifier.blockingInfo(randomId, title))
  const response = yield call(invokeRequest, definition, selection, parent, params)
  yield put(notifier.removeBlockingInfo(randomId))

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
      yield put(notifier.info('error',
        'client.component.actions.validationError',
        validation.getErrorCompact(response.body.errors),
        'exclamation'))
    } else if (response.body && response.body.params.downloadUrl) {
      const fileResponse = yield call(rest.requestBytesSaga, response.body.params.downloadUrl, {
        method: 'POST',
        body: {
          entity: selection.entityName,
          selection,
          parent,
          ...params,
          formProperties: definition.properties
        }
      })
      yield call(download.downloadReadableStream, fileResponse.body, response.body.params.filename)
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
