import {takeEvery, all, call, put} from 'redux-saga/effects'

import * as actions from './actions'
import actionHandlers from './actionHandlers'
import remoteEvents from '../../remoteEvents'
import prepare from './prepare'
import notifier from '../../notifier'

export default function* sagas(config) {
  yield all([
    takeEvery(actions.ACTION_INVOKE, invokeAction, config)
  ])
}

export function* invokeAction(config, {payload}) {
  const {definition, selection, parent} = payload

  const {abort, abortMessage, params} = yield call(prepare, definition, selection, parent, config)

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
    yield put(notifier.info('INFO', abortMessage))
  }
}
