import {actions as toastrActionsr} from 'react-redux-toastr'
import {takeEvery, call, put, all, take, delay} from 'redux-saga/effects'

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
      takeEvery(actions.INFO, handleNotify),
      takeEvery(actions.CONFIRM, handleConfirm),
      takeEvery(actions.YES_NO_QUESTION, handleYesNoQuestion),
      takeEvery(actions.BLOCKING_INFO, handleBlockingInfo),
      takeEvery(actions.REMOVE_BLOCKING_INFO, removeBlockingInfo)
    ])
  } else {
    yield all([
      takeEvery(actions.INFO, emit),
      takeEvery(actions.CONFIRM, emit),
      takeEvery(actions.YES_NO_QUESTION, emit),
      takeEvery(actions.BLOCKING_INFO, emit),
      takeEvery(actions.REMOVE_BLOCKING_INFO, emit),
      takeEvery(actions.MODAL_COMPONENT, emit),
      takeEvery(actions.REMOVE_MODAL_COMPONENT, emit)
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
