import {takeEvery, fork, call, put, all} from 'redux-saga/effects'
import {getInfoAction, getConfirmationAction} from './notifier'
import * as actions from './actions'

import actionEmitter from '../actionEmitter'

export default function* sagas(accept) {
  if (accept) {
    yield all([
      fork(takeEvery, actions.INFO, handleNotify),
      fork(takeEvery, actions.CONFIRM, handleConfirm)
    ])
  } else {
    yield all([
      fork(takeEvery, actions.INFO, emit),
      fork(takeEvery, actions.CONFIRM, emit)
    ])
  }
}

export function* handleNotify({payload}) {
  const {type, title, message, icon, timeOut} = payload
  const action = yield call(getInfoAction, type, title, message, icon, timeOut)
  yield put(action)
}

export function* handleConfirm({payload}) {
  const {message, okText, cancelText, onOk, onCancel} = payload
  const action = yield call(getConfirmationAction, message, okText, cancelText, onOk, onCancel)
  yield put(action)
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}
