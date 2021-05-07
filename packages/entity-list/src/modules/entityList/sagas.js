import {put, all, take, takeLatest} from 'redux-saga/effects'
import {appFactory} from 'tocco-app-extensions'

import * as actions from './../entityList/actions'
import * as listActions from './../list/actions'
import * as searchFormActions from './../searchForm/actions'
import * as preferenceActions from './../preferences/actions'

export const entityListSelector = state => state.entityList

export default function* sagas() {
  yield all([
    takeLatest(actions.RELOAD_DATA, reloadData),
    takeLatest(actions.RELOAD_ALL, initialize)
  ])
}

export function* initialize({payload: {waitForInputDispatch}}) {
  if (waitForInputDispatch) {
    yield take(appFactory.inputDispatchActionType)
  }
  yield put(listActions.setInProgress(true))
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
  yield all([
    take(searchFormActions.SET_INITIALIZED)
  ])
  yield put(searchFormActions.executeSearch())
}
