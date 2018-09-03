import * as actions from './actions'
import actionHandlers from './actionHandlers'
import preAction from './preActions'

import {takeEvery, fork, all, call, put} from 'redux-saga/effects'

export default function* sagas(config) {
  yield all([
    fork(takeEvery, actions.ACTION_INVOKE, invokeAction, config)
  ])
}

export function* invokeAction(config, {payload}) {
  const {definition, entity, ids, parent} = payload
  const {abort, params} = yield call(preAction.run, definition, ids)

  if (!abort) {
    const actionHandler = actionHandlers[definition.actionType]
    const response = yield call(actionHandler, definition, entity, ids, parent, params)

    if (response && response.success) {
      yield put(actions.actionInvoked(definition, entity, ids, response))
    }
  }
}
