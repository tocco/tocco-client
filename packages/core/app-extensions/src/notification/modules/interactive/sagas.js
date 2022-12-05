import {takeEvery, call, put, all} from 'redux-saga/effects'

import actionEmitter from '../../../actionEmitter'
import * as actions from './actions'
import {getConfirmationAction, getYesNoAction} from './interactive'

export default function* sagas(accept) {
  if (accept) {
    yield all([takeEvery(actions.CONFIRM, handleConfirm), takeEvery(actions.YES_NO_QUESTION, handleYesNoQuestion)])
  } else {
    yield all([takeEvery(actions.CONFIRM, emit), takeEvery(actions.YES_NO_QUESTION, emit)])
  }
}

export function* handleConfirm({payload}) {
  const action = yield call(getConfirmationAction, payload)
  yield put(action)
}

export function* handleYesNoQuestion({payload}) {
  const action = yield call(getYesNoAction, payload)
  yield put(action)
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}
