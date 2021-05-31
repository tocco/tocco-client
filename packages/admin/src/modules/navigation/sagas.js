import {rest} from 'tocco-app-extensions'
import {takeLatest, call, all, put} from 'redux-saga/effects'

import * as actions from './actions'

export function* loadMenu(id) {
  const resp = yield call(rest.requestSaga, 'client/menus/' + id)
  return resp.body.menuItems
}

export function* loadNavigation() {
  const modulesMenu = yield call(loadMenu, 'modules')
  yield put(actions.setModulesMenuTree(modulesMenu))

  const settingsMenu = yield call(loadMenu, 'settings')
  yield put(actions.setSettingsMenuTree(settingsMenu))

  const systemMenu = yield call(loadMenu, 'system')
  yield put(actions.setSystemMenuTree(systemMenu))

  const completeMenu = yield call(loadMenu, 'all')
  yield put(actions.setCompleteMenuTree(completeMenu))
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.INITIALIZE_NAVIGATION, loadNavigation)
  ])
}
