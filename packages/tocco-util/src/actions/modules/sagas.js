import {takeEvery, fork, all, call} from 'redux-saga/effects'
import * as actions from './actions'
import actionHandlers from './actionHandlers'
import preAction from './preActions'

export default function* sagas(config) {
  yield all([
    fork(takeEvery, actions.ACTION_INVOKE, invokeAction, config)
  ])
}

export function* invokeAction(config, {payload}) {
  const {definition, entity, ids, callback} = payload
  const {abort, params} = yield call(preAction.run, definition, ids)

  if (!abort) {
    const actionHandler = actionHandlers[definition.actionType]
    const response = yield call(actionHandler, definition, entity, ids, params)
    if (callback) {
      yield call(callback, response)
    }
  }
}
