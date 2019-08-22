import {rest} from 'tocco-app-extensions'

import * as actions from './actions'

import {takeLatest, fork, call, all, put} from 'redux-saga/effects'

export function* loadNavigation() {
  const response = yield call(rest.requestSaga, 'menus/modules')

  yield put(actions.setMenuItems(response.body.menuItems))
}

export default function* mainSagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE_NAVIGATION, loadNavigation)
  ])
}
