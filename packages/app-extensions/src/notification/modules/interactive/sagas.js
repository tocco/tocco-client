import {takeEvery, call, put, all} from 'redux-saga/effects'

import {
  getConfirmationAction,
  getYesNoAction
} from './interactive'
import * as actions from './actions'
import actionEmitter from '../../../actionEmitter'

export default function* sagas(accept) {
  if (accept) {
    yield all([
      takeEvery(actions.CONFIRM, handleConfirm),
      takeEvery(actions.YES_NO_QUESTION, handleYesNoQuestion)
    ])
  } else {
    yield all([
      takeEvery(actions.CONFIRM, emit),
      takeEvery(actions.YES_NO_QUESTION, emit)
    ])
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

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}
