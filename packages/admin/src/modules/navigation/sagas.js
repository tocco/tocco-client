import {rest} from 'tocco-app-extensions'
import {takeLatest, call, all, put, select, debounce} from 'redux-saga/effects'

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
    const [visibleMenus, activeTab] = menuPreference.split('#')
    yield put(actions.setVisibleMenus(visibleMenus))
    yield put(actions.setActiveMenuTab(activeTab))
  }
}

export function* saveOpenMenuPreference({payload: {activeMenuTab}}) {
  const {visibleMenus} = yield select(navigationSelector)
  yield put(saveUserPreferences({[preferencesKey]: `${visibleMenus}#${activeMenuTab}`}))
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.INITIALIZE_NAVIGATION, loadNavigation),
    debounce(500, actions.SET_ACTIVE_MENU_TAB, saveOpenMenuPreference),
    takeLatest(SET_USER_PREFERENCES, setActiveMenuFromPreferences)
  ])
}
