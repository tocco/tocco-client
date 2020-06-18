import {call, put} from 'redux-saga/effects'
import React from 'react'
import {consoleLogger} from 'tocco-util'

import notifier from '../../../notifier'

export default function* (definition, selection, parent, params, config) {
  if (definition.appId) {
    if (definition.fullscreen) {
      if (config.customActions && config.customActions.fullscreen) {
        yield call(config.customActions.fullscreen, definition, selection)
      } else {
        consoleLogger.logError('Unable to render custom action: No fullscreen handler provided')
      }
    } else {
      if (config.appComponent) {
        const ActionComponent = config.appComponent
        yield put(notifier.modalComponent(
          `action-${definition.appId}`,
          null,
          null,
          () => <ActionComponent appId={definition.appId} selection={selection}/>,
          true
        ))
      } else {
        consoleLogger.logError('Unable to render custom action: No appComponent provided')
      }
    }
  } else {
    const handler = config && config.customActions && config.customActions[definition.id]
    if (handler) {
      yield call(handler, definition, selection, parent, params, config)
    } else {
      consoleLogger.logError(`Unable to load custom action with id ${definition.id}`)
    }
  }
}
