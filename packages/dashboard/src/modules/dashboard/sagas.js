import {put, call, all, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'

export default function* sagas() {
  yield all([
    call(loadDashboard),
    takeLatest(actions.LOAD_DASHBOARD, loadDashboard)
  ])
}

export function* loadDashboard() {
  const options = {
    method: 'GET'
  }
  const response = yield call(rest.requestSaga, 'client/dashboard', options)
  const dashboard = response.body.infoboxes
  yield put(actions.setDashboard(dashboard))
  return dashboard
}
