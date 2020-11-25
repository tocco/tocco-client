import {rest} from 'tocco-app-extensions'
import {takeLatest, call, all, put} from 'redux-saga/effects'
import {cache} from 'tocco-util'

import * as actions from './actions'

export function* loadMenu(id) {
  const cachedMenu = cache.getLongTerm('menu', id)
  if (cachedMenu) {
    return cachedMenu
  }

  const resp = yield call(rest.requestSaga, 'client/menus/' + id)
  const menu = resp.body.menuItems
  cache.addLongTerm('menu', id, menu)
  return menu
}

export function* loadNavigation() {
  const modulesMenu = yield call(loadMenu, 'modules')
  yield put(actions.setModulesMenuTree(modulesMenu))

  const settingsMenu = yield call(loadMenu, 'settings')
  yield put(actions.setSettingsMenuTree(settingsMenu))
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.INITIALIZE_NAVIGATION, loadNavigation)
  ])
}
