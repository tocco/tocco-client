import {takeEvery, put, all} from 'redux-saga/effects'

import actionEmitter from '../../../actionEmitter'
import * as actions from './actions'

export default function* sagas(accept) {
  if (!accept) {
    yield all([takeEvery(actions.MODAL, emit), takeEvery(actions.REMOVE_MODAL, emit)])
  }
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}
