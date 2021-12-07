import {put, call, all, take, takeLatest} from 'redux-saga/effects'
import {appFactory, externalEvents} from 'tocco-app-extensions'

import * as actions from './../entityList/actions'
import * as listActions from './../list/actions'
import * as preferenceActions from './../preferences/actions'
import * as searchFormActions from './../searchForm/actions'

export const entityListSelector = state => state.entityList

export default function* sagas() {
  yield all([
    call(initialize),
    takeLatest(actions.RELOAD_DATA, reloadData),
    takeLatest(actions.RELOAD_ALL, initialize, false),
    takeLatest(actions.SET_SEARCH_FORM_COLLAPSED, searchFormCollapsed)
  ])
}

export function* initialize(waitForInputDispatch = true) {
  if (waitForInputDispatch) {
    yield take(appFactory.inputDispatchActionType)
  }
  yield put(listActions.initialize())
  yield put(preferenceActions.loadPreferences())
  yield put(searchFormActions.initialize())
  yield all([
    take(listActions.SET_INITIALIZED),
    take(searchFormActions.SET_INITIALIZED),
    take(preferenceActions.SET_PREFERENCES_LOADED)
  ])
  yield put(listActions.defineSorting())
  yield take(listActions.SET_SORTING)
  yield put(searchFormActions.executeSearch())
}

export function* reloadData() {
  yield put(searchFormActions.initialize())
  yield all([take(searchFormActions.SET_INITIALIZED)])
  yield put(searchFormActions.executeSearch())
}

export function* searchFormCollapsed({payload: {searchFormCollapsed}}) {
  yield put(externalEvents.fireExternalEvent('onSearchFormCollapsedChange', {collapsed: searchFormCollapsed}))
}
