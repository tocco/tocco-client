import {call, put} from 'redux-saga/effects'
import {download, validation} from 'tocco-util'
import {v4 as uuid} from 'uuid'

import errorLogging from '../../../errorLogging'
import notification from '../../../notification'
import NotificationBody from '../../../notification/components/NotificationBody'
import {TOASTER_KEY_PREFIX} from '../../../notification/modules/socket/socket'
import rest from '../../../rest'

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
      ...params,
      params: {
        background: true
      },
      formProperties: definition.properties
    },
    acceptedErrorCodes: ['VALIDATION_FAILED']
  })

  if (response.body && response.body.success === false) {
    yield put(
      notification.toaster({
        type: 'error',
        title: 'client.common.unexpectedError',
        body: response.body.title || 'client.component.actions.errorText'
      })
    )
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
        ? [
            {
              type: 'entity-update-event',
              payload: {
                parent,
                entities: [{entityName: selection.entityName}]
              }
            }
          ]
        : [])
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
        notification.toaster({
          type: 'error',
          title: 'client.component.actions.validationError',
          body: validation.getErrorCompact(response.body.errors)
        })
      )
    } else if (response.body && response.body.params && response.body.params.downloadUrl) {
      const downloadUrl = download.getDownloadUrl(response.body.params.downloadUrl)
      const fileResponse = yield call(rest.requestBytesSaga, downloadUrl, {
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
      yield call(showToaster, response, response.body.success === true ? 'success' : 'warning')
    }

    return response.body
  } catch (error) {
    if (!(error instanceof rest.ClientQuestionCancelledException)) {
      yield put(errorLogging.logError('client.common.unexpectedError', 'client.component.actions.errorText', error))
    }
  }
}

export function* showToaster(response, type) {
  const title = response.body.title || 'client.component.actions.successDefault'
  const message = response.body.message
  const key = response.body.notificationKey ? `${TOASTER_KEY_PREFIX}${response.body.notificationKey}` : undefined
  const result = response.body.result
  const body = ({navigationStrategy, cancelTask}) => (
    <NotificationBody
      notification={{key, message, result}}
      navigationStrategy={navigationStrategy}
      cancelTask={cancelTask}
    />
  )
  yield put(notification.toaster({type, title, message, body, key}))
}
