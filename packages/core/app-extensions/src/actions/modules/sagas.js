import {all, call, put, select, takeEvery} from 'redux-saga/effects'

import notification from '../../notification'
import remoteEvents from '../../remoteEvents'
import actionHandlers from './actionHandlers'
import * as actions from './actions'
import prepare from './prepare'

export default function* sagas(configSelector) {
  yield all([takeEvery(actions.ACTION_INVOKE, invokeAction, configSelector)])
}

export function* invokeAction(configSelector, {payload}) {
  const {definition, selection: initialSelection, parent} = payload
  const config = yield select(configSelector)

  const {abort, abortMessage, params, selection} = yield call(prepare, definition, initialSelection, parent, config)

  if (!abort) {
    const actionHandler = actionHandlers[definition.actionType]
    const response = yield call(actionHandler, definition, selection, parent, params, config)

    if (response && response.remoteEvents) {
      yield all(response.remoteEvents.map(remoteEvent => put(remoteEvents.remoteEvent(remoteEvent))))
    }

    if (response && response.success) {
      yield put(actions.actionInvoked(definition, selection, response))
    }
  } else if (abortMessage) {
    yield put(notification.toaster({type: 'error', title: abortMessage}))
  }
}
