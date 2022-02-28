import React from 'react'
import {channel} from 'redux-saga'
import {call, put, take, select} from 'redux-saga/effects'
import {consoleLogger, intl} from 'tocco-util'

import notification from '../../../notification'

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
      return yield call(handleAppActionsFallback, {definition, selection, parent, params, config, handler})
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

  const locale = yield select(intl.localeSelector)

  const ActionComponent = config.appComponent
  yield put(
    notification.modal(
      `action-${definition.appId}`,
      `client.actions.${definition.appId}.title`,
      null,
      ({close}) => {
        const onSuccess = ({title, message, remoteEvents} = {}) => {
          close()
          answerChannel.put({status: actionStatus.OK, title, message, remoteEvents})
        }

        const onError = ({title, message} = {}) => {
          close()
          answerChannel.put({status: actionStatus.NOT_OK, title, message})
        }

        const onCancel = () => {
          close()
          answerChannel.put({status: actionStatus.CANCEL})
        }

        return (
          <ActionComponent
            appId={definition.appId}
            context={config.context}
            actionProperties={definition.properties}
            selection={selection}
            navigationStrategy={config.navigationStrategy || {}}
            locale={locale}
            onSuccess={onSuccess}
            onError={onError}
            onCancel={onCancel}
          />
        )
      },
      true
    )
  )
  const response = yield take(answerChannel)
  if (response.status === actionStatus.CANCEL) {
    return null
  }

  const success = response.status === actionStatus.OK
  if (response.title !== null) {
    const type = success ? 'success' : 'error'
    const title = response.title || 'client.component.actions.successDefault'

    yield put(notification.toaster({type, title, body: response.message}))
  }
  return {success: success, remoteEvents: response.remoteEvents}
}

export function* handleFullScreenActions({definition, selection, config}) {
  yield call(config.customActions.fullscreen, definition, selection)
}

export function* handleAppActionsFallback({definition, selection, config, parent, params, handler}) {
  const answerChannel = yield call(channel)
  const onSuccess = ({title, message, remoteEvents}) => {
    answerChannel.put({status: actionStatus.OK, title, message, remoteEvents})
  }
  const onError = ({title, message}) => {
    answerChannel.put({status: actionStatus.NOT_OK, title, message})
  }
  const onCancel = () => {
    answerChannel.put({status: actionStatus.CANCEL})
  }

  yield call(handler, definition, selection, parent, params, config, onSuccess, onError, onCancel)

  return yield call(handleAnswer, answerChannel)
}

export function* handleAnswer(answerChannel) {
  const response = yield take(answerChannel)
  if (response.status === actionStatus.CANCEL) {
    return null
  }

  const success = response.status === actionStatus.OK

  if (response.title) {
    const type = success ? 'success' : 'error'
    const title = response.title === 'default' ? 'client.component.actions.successDefault' : response.title

    yield put(notification.toaster({type, title, body: response.message}))
  }

  return {success: success, remoteEvents: response.remoteEvents}
}
