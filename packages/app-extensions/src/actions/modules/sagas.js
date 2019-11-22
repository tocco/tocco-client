import {takeEvery, fork, all, call, put} from 'redux-saga/effects'

import * as actions from './actions'
import actionHandlers from './actionHandlers'
import preAction from './preActions'

export default function* sagas(config) {
  yield all([
    fork(takeEvery, actions.ACTION_INVOKE, invokeAction, config)
  ])
}

export function* invokeAction(config, {payload}) {
  const {definition, selection, parent} = payload
  const {abort, params} = yield call(preAction.run, definition, selection, config)

  if (!abort) {
    const actionHandler = actionHandlers[definition.actionType]
    const response = yield call(actionHandler, definition, selection, parent, params, config)

    if (response && response.success) {
      yield put(actions.actionInvoked(definition, selection, response))
    }
  }
}
