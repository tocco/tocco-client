import {takeEvery, all, put, call, select} from 'redux-saga/effects'

import * as actions from './actions'

export default function* sagas(configSelector) {
  yield all([
    takeEvery(actions.EMIT_ACTION, emitAction, configSelector),
    takeEvery(actions.DISPATCH_EMITTED_ACTION, dispatchAction)
  ])
}

export function* emitAction(configSelector, {payload}) {
  const {action} = payload
  const parentEmitAction = yield select(configSelector)
  if (parentEmitAction) {
    yield call(parentEmitAction, action)
  }
}

export function* dispatchAction({payload}) {
  const {action} = payload
  yield put(action)
}
