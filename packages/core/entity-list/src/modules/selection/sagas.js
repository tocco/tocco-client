import {call, put, select, takeLatest, all} from 'redux-saga/effects'
import {externalEvents, actions as actionExtensions} from 'tocco-app-extensions'

import {combineSelection} from '../../util/selection'
import selectionStyles from '../../util/selectionStyles'
import * as actions from './actions'

export const inputSelector = state => state.input
export const entityListSelector = state => state.entityList
export const selectionSelector = state => state.selection
export const listSelector = state => state.list

export default function* sagas() {
  yield all([
    takeLatest(actions.TOGGLE_SHOW_SELECTED_RECORDS, reloadData),
    takeLatest(actions.ON_SELECT_CHANGE, onSelectChange),
    takeLatest(actions.CLEAR_SELECTION, clearSelection),
    takeLatest(actionExtensions.actions.ACTION_INVOKED, handleActionResponse)
  ])
}

export function* onSelectChange({payload: {keys, isSelected}}) {
  const {selection: currentSelection} = yield select(selectionSelector)
  const {selectionStyle} = yield select(inputSelector)

  const newSelection =
    selectionStyle === selectionStyles.SINGLE ? keys : yield call(combineSelection, currentSelection, keys, isSelected)

  yield put(actions.setSelection(newSelection))
  yield put(externalEvents.fireExternalEvent('onSelectChange', newSelection))
}

export function* handleActionResponse({payload: {response}}) {
  if (response.clearSelection) {
    yield put(actions.clearSelection())
  }
}

export function* clearSelection() {
  yield put(externalEvents.fireExternalEvent('onSelectChange', []))
}

export function* reloadData() {
  yield put(actions.reloadData())
}
