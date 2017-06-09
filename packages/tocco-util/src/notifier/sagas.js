import {takeEvery, call, put, all} from 'redux-saga/effects'
import {getToastrConfirmation, getToastrNotifyAction} from './notifier'
import * as actions from './actions'

import actionEmitter from '../actionEmitter'

export default function* sagas(accept) {
  if (accept) {
    yield all([
      yield takeEvery(actions.NOTIFY, handleNotify),
      yield takeEvery(actions.CONFIRM, handleConfirm)

    ])
  } else {
    yield all([
      yield takeEvery(actions.NOTIFY, emit),
      yield takeEvery(actions.CONFIRM, emit)
    ])
  }
}

export function* handleNotify({payload}) {
  const {type, title, message, icon, timeOut} = payload
  const action = yield call(getToastrNotifyAction, type, title, message, icon, timeOut)
  yield put(action)
}

export function* handleConfirm({payload}) {
  const {message, okText, cancelText, onOk, onCancel} = payload
  const action = yield call(getToastrConfirmation, message, okText, cancelText, onOk, onCancel)
  yield put(action)
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}
