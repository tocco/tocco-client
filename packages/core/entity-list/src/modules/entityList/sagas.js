import {put, call, all, take, takeLatest} from 'redux-saga/effects'
import {appFactory, externalEvents} from 'tocco-app-extensions'

import {getDispatchActions, getReloadOption, reloadOptions} from '../../input'
import * as actions from './../entityList/actions'
import * as listActions from './../list/actions'
import * as preferenceActions from './../preferences/actions'
import * as searchFormActions from './../searchForm/actions'

export const entityListSelector = state => state.entityList

export default function* sagas() {
  yield all([
    call(initialize),
    takeLatest(appFactory.INPUT_CHANGED, inputChanged),
    takeLatest(actions.RELOAD_DATA, reloadData),
    takeLatest(actions.RELOAD_ALL, initialize, false),
    takeLatest(actions.SET_SEARCH_FORM_COLLAPSED, searchFormCollapsed)
  ])
}

export function* inputChanged({payload}) {
  const {input, prevInput} = payload

  const reloadOption = getReloadOption(input)
  if (
    (input.store && typeof prevInput.store !== 'undefined') ||
    (typeof input.store === 'undefined' && typeof prevInput.store !== 'undefined')
  ) {
    /**
     * Do not reload data when store has changed.
     * When store has changed app will get re-initalised completely in main.js.
     * Use case:
     *  - Open docs-browser
     *  - Navigate to folder
     *  - Start search
     *  - => should navigate to search results and search input should still be there
     */
    return
  }

  const derivedActions = getDispatchActions(input)
  yield all(derivedActions.map(action => put(action)))

  if (reloadOption === reloadOptions.ALL) {
    yield put(actions.reloadAll())
  } else if (reloadOption === reloadOptions.DATA) {
    yield put(actions.reloadData())
  }
}

export function* initialize(waitForInputDispatch = true) {
  if (waitForInputDispatch) {
    yield take(appFactory.INPUT_INITIALIZED)
  }

  yield put(listActions.initialize())
  yield take(listActions.SET_INITIALIZED)

  yield put(searchFormActions.initialize())
  yield take(searchFormActions.SET_INITIALIZED)

  yield put(preferenceActions.loadPreferences())
  yield take(preferenceActions.SET_PREFERENCES_LOADED)

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
