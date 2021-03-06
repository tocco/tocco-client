import {takeEvery, all, put, call} from 'redux-saga/effects'

import * as actions from './actions'

export default function* sagas(parentEmitAction) {
  yield all([
    takeEvery(actions.EMIT_ACTION, emitAction, parentEmitAction),
    takeEvery(actions.DISPATCH_EMITTED_ACTION, dispatchAction)
  ])
}

export function* emitAction(parentEmitAction, {payload}) {
  const {action} = payload
  if (parentEmitAction) {
    yield call(parentEmitAction, action)
  }
}

export function* dispatchAction({payload}) {
  const {action} = payload
  yield put(action)
}
