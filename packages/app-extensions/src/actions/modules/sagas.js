import {takeEvery, all, call, put} from 'redux-saga/effects'

import * as actions from './actions'
import actionHandlers from './actionHandlers'
import preAction from './preActions'
import remoteEvents from '../../remoteEvents'

export default function* sagas(config) {
  yield all([
    takeEvery(actions.ACTION_INVOKE, invokeAction, config)
  ])
}

export function* invokeAction(config, {payload}) {
  const {definition, selection, parent} = payload
  const {abort, params} = yield call(preAction.run, definition, selection, config)

  if (!abort) {
    const actionHandler = actionHandlers[definition.actionType]
    const response = yield call(actionHandler, definition, selection, parent, params, config)

    if (response.remoteEvents) {
      yield all(response.remoteEvents.map(remoteEvent => put(remoteEvents.remoteEvent(remoteEvent))))
    }

    if (response && response.success) {
      yield put(actions.actionInvoked(definition, selection, response))
    }
  }
}
