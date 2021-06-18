import {takeEvery, put, all} from 'redux-saga/effects'

import * as actions from './actions'
import actionEmitter from '../../../actionEmitter'

export default function* sagas(accept) {
  if (!accept) {
    yield all([
      takeEvery(actions.BLOCKING_INFO, emit),
      takeEvery(actions.REMOVE_BLOCKING_INFO, emit)
    ])
  }
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}
