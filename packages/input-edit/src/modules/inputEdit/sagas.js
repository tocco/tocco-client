import {actions, actionEmitter} from 'tocco-app-extensions'
import {all, takeEvery, put} from 'redux-saga/effects'

export default function* sagas() {
  yield all([
    takeEvery(actions.actions.ACTION_INVOKE, emit)
  ])
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}
