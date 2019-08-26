import {actions as toastrActionsr} from 'react-redux-toastr'
import {delay} from 'redux-saga'
import {takeEvery, fork, call, put, all, take} from 'redux-saga/effects'

import {
  getInfoAction,
  getConfirmationAction,
  getYesNoAction,
  getBlockingInfo
} from '../notificationActionFactory'
import * as actions from './actions'
import actionEmitter from '../../actionEmitter'

export default function* sagas(accept) {
  if (accept) {
    yield all([
      fork(takeEvery, actions.INFO, handleNotify),
      fork(takeEvery, actions.CONFIRM, handleConfirm),
      fork(takeEvery, actions.YES_NO_QUESTION, handleYesNoQuestion),
      fork(takeEvery, actions.BLOCKING_INFO, handleBlockingInfo),
      fork(takeEvery, actions.REMOVE_BLOCKING_INFO, removeBlockingInfo)
    ])
  } else {
    yield all([
      fork(takeEvery, actions.INFO, emit),
      fork(takeEvery, actions.CONFIRM, emit),
      fork(takeEvery, actions.YES_NO_QUESTION, emit),
      fork(takeEvery, actions.BLOCKING_INFO, emit),
      fork(takeEvery, actions.REMOVE_BLOCKING_INFO, emit),
      fork(takeEvery, actions.MODAL_COMPONENT, emit),
      fork(takeEvery, actions.REMOVE_MODAL_COMPONENT, emit)
    ])
  }
}

export function* handleNotify({payload}) {
  const {type, title, message, icon, timeOut} = payload
  const action = yield call(getInfoAction, type, title, message, icon)
  yield put(action)
  if (timeOut) {
    yield take(actions.USER_ACTIVE)
    yield delay(timeOut)
    yield put(toastrActionsr.remove(action.payload.id))
  }
}

export function* handleConfirm({payload}) {
  const {title, message, okText, cancelText, onOk, onCancel} = payload
  const action = yield call(getConfirmationAction, title, message, okText, cancelText, onOk, onCancel)
  yield put(action)
}

export function* handleYesNoQuestion({payload}) {
  const {title, message, yesText, noText, cancelText, onYes, onNo, onCancel} = payload
  const action = yield call(getYesNoAction, title, message, yesText, noText, cancelText, onYes, onNo, onCancel)
  yield put(action)
}

export function* handleBlockingInfo({payload}) {
  const {id, title, message} = payload

  const action = yield call(getBlockingInfo, id, title, message)
  yield put(action)
}

export function* removeBlockingInfo({payload}) {
  const {id} = payload
  yield put(toastrActionsr.remove(id))
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}
