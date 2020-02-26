import {takeLatest, call, put, all} from 'redux-saga/effects'

import {loginSaga} from '../sagas'
import {setPending} from '../loginForm/actions'
import * as actions from './actions'

export function* twoStepSaga(args) {
  yield put(setPending(true))
  yield call(loginSaga, args)
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.TWOSTEPLOGIN, twoStepSaga)
  ])
}
