import {externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'
import selectionStyles from '../../util/selectionStyles'
import {SET_FORM_SELECTABLE, QUERY_CHANGED, SET_ENTITY_COUNT} from '../list/actions'
import {combineSelection, showSelectionComponent, getTableSelectionStyle} from '../../util/selection'

import {call, put, fork, select, takeLatest, all} from 'redux-saga/effects'

export const inputSelector = state => state.input
export const entityListSelector = state => state.entityList
export const selectionSelector = state => state.selection
export const listSelector = state => state.list

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.TOGGLE_SHOW_SELECTED_RECORDS, reloadData),
    fork(takeLatest, actions.CLEAR_SELECTION, reloadData),
    fork(takeLatest, actions.ON_SELECT_CHANGE, onSelectChange),
    fork(takeLatest, SET_FORM_SELECTABLE, initialize),
    fork(takeLatest, QUERY_CHANGED, setQuery),
    fork(takeLatest, SET_ENTITY_COUNT, setCount)
  ])
}

export function* onSelectChange({payload: {keys, isSelected}}) {
  const {selection: currentSelection} = yield select(selectionSelector)
  const {selectionStyle} = yield select(inputSelector)

  const newSelection = selectionStyle === selectionStyles.SINGLE
    ? keys : yield call(combineSelection, currentSelection, keys, isSelected)

  yield put(actions.setSelection(newSelection))
  yield put(externalEvents.fireExternalEvent('onSelectChange', newSelection))
}

export function* reloadData() {
  yield put(actions.reloadData())
}

export function* initialize() {
  const {formSelectable} = yield select(listSelector)
  const {selectionStyle, disableSelectionController} = yield select(inputSelector)
  const {selectionMode} = yield select(selectionSelector)

  const selectionControllerVisible = yield call(
    showSelectionComponent,
    selectionStyle,
    disableSelectionController,
    formSelectable
  )
  yield put(actions.setShowSelectionController(selectionControllerVisible))

  yield call(setTableStyle, selectionMode)
}

export function* setTableStyle() {
  const {formSelectable} = yield select(listSelector)
  const {selectionStyle} = yield select(inputSelector)

  const tableSelectionStyle = yield call(getTableSelectionStyle, selectionStyle, formSelectable)
  yield put(actions.setTableSelectionStyle(tableSelectionStyle))
}

export function* setQuery({payload}) {
  const {query} = payload
  yield put(actions.setQuery(query))
}

export function* setCount({payload}) {
  const {entityCount} = payload
  yield put(actions.setQueryCount(entityCount))
}
