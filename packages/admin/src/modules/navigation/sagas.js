import {rest} from 'tocco-app-extensions'
import {takeLatest, call, all, put, debounce} from 'redux-saga/effects'

import * as actions from './actions'
import {SET_USER_PREFERENCES, saveUserPreferences} from '../preferences/actions'

export const navigationSelector = state => state.navigation

const preferencesKey = 'admin.activeMenu'

export function* loadMenu(id) {
  const resp = yield call(rest.requestSaga, `client/menus/${id}`)
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

export function* setActiveMenuFromPreferences({payload: {userPreferences}}) {
  const menuPreference = userPreferences[preferencesKey]
  if (menuPreference) {
    yield put(actions.setActiveMenuTab(menuPreference))
  }
}

export function* saveOpenMenuPreference({payload: {activeMenuTab}}) {
  yield put(saveUserPreferences({[preferencesKey]: activeMenuTab}))
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.INITIALIZE_NAVIGATION, loadNavigation),
    debounce(500, actions.SET_ACTIVE_MENU_TAB, saveOpenMenuPreference),
    takeLatest(SET_USER_PREFERENCES, setActiveMenuFromPreferences)
  ])
}
