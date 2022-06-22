import {all, call, put, takeLatest} from 'redux-saga/effects'

import rest from '../../../rest'
import * as actions from './actions'

export default function* sagas() {
  yield all([takeLatest(actions.FETCH_ACTION_PACKAGES, fetchActionPackages)])
}

export function* fetchActionPackages() {
  const response = yield call(rest.requestSaga, `/client/actionPackages`, {method: 'GET'})

  yield put(actions.setActionPackages(response.body?.actionPackages || []))
}
