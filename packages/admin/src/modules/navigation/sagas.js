import {takeLatest, call, all, put, debounce, select} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import {menuTabs} from '../../utils/navigationUtils'
import {SET_USER_PREFERENCES, saveUserPreferences} from '../preferences/actions'
import * as actions from './actions'

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

function* getMenuTree(menuTab) {
  const {settingsMenuTree, modulesMenuTree, systemMenuTree, completeMenuTree} = yield select(navigationSelector)

  if (menuTab === menuTabs.MODULES) {
    return modulesMenuTree
  }

  if (menuTab === menuTabs.SETTINGS) {
    return settingsMenuTree
  }

  if (menuTab === menuTabs.SYSTEM) {
    return systemMenuTree
  }

  if (menuTab === menuTabs.COMPLETE) {
    return completeMenuTree
  }

  return null
}

export function* setActiveMenuFromShortcut({payload: {menuTab}}) {
  const tree = yield call(getMenuTree, menuTab)
  const hasEntries = tree?.length > 0

  if (hasEntries) {
    yield put(actions.toggleShortcutMenu(menuTab))
    yield put(actions.setActiveMenuTab(menuTab))
  }
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.INITIALIZE_NAVIGATION, loadNavigation),
    debounce(500, actions.SET_ACTIVE_MENU_TAB, saveOpenMenuPreference),
    takeLatest(SET_USER_PREFERENCES, setActiveMenuFromPreferences),
    takeLatest(actions.SET_SHORTCUT_MENU_TAB, setActiveMenuFromShortcut)
  ])
}
