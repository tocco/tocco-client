import {put, call, all, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'

export default function* sagas() {
  yield all([
    call(loadDashboard),
    takeLatest(actions.LOAD_DASHBOARD, loadDashboard),
    takeLatest(actions.SAVE_INFOBOX_POSITIONS, saveInfoBoxPositions),
    takeLatest(actions.SAVE_INFOBOX_HEIGHT, saveInfoBoxHeight)
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

export function* saveInfoBoxPositions({payload: {infoBoxes}}) {
  // TODO: implement BE call
  // eslint-disable-next-line
  console.log('save infobox positions')
  yield put(actions.setDashboard(infoBoxes))
  return infoBoxes
}

export function* saveInfoBoxHeight({payload: {id, height}}) {
  // TODO: implement BE call
  // eslint-disable-next-line
  console.log('save infobox height', id, height)
}
