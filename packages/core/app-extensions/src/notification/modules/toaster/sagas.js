import {takeEvery, put, all} from 'redux-saga/effects'

import actionEmitter from '../../../actionEmitter'
import * as actions from './actions'

export default function* sagas(accept) {
  if (accept) {
    yield all([takeEvery(actions.REMOVE_TOASTER, removeToaster)])
  } else {
    yield all([takeEvery(actions.TOASTER, emit), takeEvery(actions.REMOVE_TOASTER, emit)])
  }
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}

export function* removeToaster({payload: {key, manually}}) {
  yield put(actions.removeToasterFromStore(key))
}
