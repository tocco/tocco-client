import {rest} from 'tocco-app-extensions'
import {takeLatest, fork, call, all, put} from 'redux-saga/effects'

import * as actions from './actions'

export function* loadNavigation() {
  const response = yield call(rest.requestSaga, 'menus/modules')

  yield put(actions.setMenuItems(response.body.menuItems))
}

export default function* mainSagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE_NAVIGATION, loadNavigation)
  ])
}
