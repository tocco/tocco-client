import {call, put, take} from 'redux-saga/effects'
import React from 'react'
import {consoleLogger} from 'tocco-util'
import {channel} from 'redux-saga'

import notifier from '../../../notifier'

export default function* (definition, selection, parent, params, config) {
  if (definition.appId) {
    if (definition.fullscreen) {
      if (config.customActions && config.customActions.fullscreen) {
        yield call(handleFullScreenActions, {definition, selection, config})
      } else {
        yield call(consoleLogger.logError, 'Unable to render custom action: No fullscreen handler provided')
      }
    } else {
      if (config.appComponent) {
        return yield call(handleCustomActionModal, {definition, config, selection})
      } else {
        yield call(consoleLogger.logError, 'Unable to render custom action: No appComponent provided')
      }
    }
  } else {
    const handler = config && config.customActions && config.customActions[definition.id]
    if (handler) {
      yield call(handleAppActionsFallback, {definition, selection, parent, params, config, handler})
    } else {
      yield call(consoleLogger.logError, `Unable to load custom action with id ${definition.id}`)
    }
  }
}

const actionStatus = {
  OK: 'ok',
  NOT_OK: 'not_ok',
  CANCEL: 'cancel'
}

export function* handleCustomActionModal({definition, selection, config}) {
  const answerChannel = yield call(channel)

  const ActionComponent = config.appComponent
  yield put(notifier.modalComponent(
    `action-${definition.appId}`,
    `client.actions.${definition.appId}.title`,
    null,
    ({close}) => {
      const onSuccess = ({message, remoteEvents}) => {
        close()
        answerChannel.put({status: actionStatus.OK, message, remoteEvents})
      }

      const onError = ({message}) => {
        close()
        answerChannel.put({status: actionStatus.NOT_OK, message})
      }

      const onCancel = () => {
        close()
        answerChannel.put({status: actionStatus.CANCEL})
      }

      return <ActionComponent
        appId={definition.appId}
        actionProperties={definition.properties}
        selection={selection}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />
    },
    true
  ))
  const response = yield take(answerChannel)
  if (response.status === actionStatus.CANCEL) {
    return null
  }

  const success = response.status === actionStatus.OK
  const type = success ? 'success' : 'warning'
  const icon = success ? 'check' : 'exclamation'
  const title = response.message || 'client.component.actions.successDefault'

  yield put(notifier.info(type, title, null, icon, 3000))
  return {success: success, remoteEvents: response.remoteEvents}
}

export function* handleFullScreenActions({definition, selection, config}) {
  yield call(config.customActions.fullscreen, definition, selection)
}

export function* handleAppActionsFallback({definition, selection, config, parent, params, handler}) {
  yield call(handler, definition, selection, parent, params, config)
}
