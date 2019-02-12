import {loginSaga} from '../sagas'
import {setPending} from '../loginForm/actions'
import * as actions from './actions'

import {takeLatest, fork, call, put, all} from 'redux-saga/effects'

export function* twoStepSaga(args) {
  yield put(setPending(true))
  yield call(loginSaga, args)
}

export default function* rootSaga() {
  yield all([
    fork(takeLatest, actions.TWOSTEPLOGIN, twoStepSaga)
  ])
}
