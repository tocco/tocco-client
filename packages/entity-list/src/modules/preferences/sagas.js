import {rest, notifier} from 'tocco-app-extensions'
import {all, call, put, select, take, takeLatest} from 'redux-saga/effects'
import React from 'react'
import {channel} from 'redux-saga'

import * as actions from './actions'
import {setPositions, setSorting, setColumns} from './actions'
import * as listActions from '../list/actions'
import * as listSagas from '../list/sagas'
import * as util from '../../util/preferences'
import ColumnPicker from '../../components/ColumnPicker'
import {getTableColumns} from '../../util/api/forms'

export const inputSelector = state => state.input

export const preferencesSelector = state => state.preferences

export default function* sagas() {
  yield all([
    takeLatest(actions.LOAD_PREFERENCES, loadPreferences),
    takeLatest(actions.CHANGE_POSITION, changePosition),
    takeLatest(listActions.SET_SORTING_INTERACTIVE, saveSorting),
    takeLatest(actions.RESET_SORTING, resetSorting),
    takeLatest(actions.RESET_COLUMNS, resetColumns),
    takeLatest(actions.RESET_PREFERENCES, resetPreferences),
    takeLatest(actions.DISPLAY_COLUMN_MODAL, displayColumnModal)
  ])
}

export function* loadPreferences() {
  const listState = yield select(listSagas.entityListSelector)
  const formName = `${listState.formName}_list`
  const preferences = yield call(rest.fetchUserPreferences, `${formName}*`)
  yield put(setPositions(util.getPositions(preferences)))
  yield put(setSorting(util.getSorting(preferences)))
  yield put(setColumns(util.getColumns(preferences)))
}

export function* changePosition({payload}) {
  const {field, afterFieldPosition, columns} = payload
  let {positions} = yield select(preferencesSelector)

  if (Object.keys(positions).length === 0) {
    positions = yield call(util.getPositionsFromColumns, columns)
  }

  const newPositions = yield call(util.changePosition, positions, field, afterFieldPosition)
  yield put(setPositions(newPositions))
  const listState = yield select(listSagas.entityListSelector)
  const formName = `${listState.formName}_list`
  yield call(rest.deleteUserPreferences, `${formName}.*.positions`)
  const positionPreferences = yield call(util.getPositionsPreferencesToSave, formName, newPositions)
  yield call(rest.savePreferences, positionPreferences)
}

export function* saveSorting() {
  const {sorting: sortings} = yield select(listSagas.listSelector)
  if (sortings.length > 0) {
    const listState = yield select(listSagas.entityListSelector)
    const formName = `${listState.formName}_list`
    yield all([
      call(rest.deleteUserPreferences, `${formName}.sortingField*`),
      call(rest.deleteUserPreferences, `${formName}.sortingDirection*`)
    ])
    const sortingPreferences = sortings.slice(1)
      .map((sorting, index) => util.getAdditionalSortingPreferencesToSave(formName, sorting, index + 1))
      .reduce((acc, sorting) => ({
        ...acc,
        ...sorting
      }), util.getSortingPreferencesToSave(formName, sortings[0]))
    yield call(rest.savePreferences, sortingPreferences)
  }
}

export function* resetSorting() {
  const listState = yield select(listSagas.entityListSelector)
  yield all([
    call(rest.deleteUserPreferences, `${listState.formName}_list.sortingField*`),
    call(rest.deleteUserPreferences, `${listState.formName}_list.sortingDirection*`)
  ])
  yield call(listSagas.setSorting)
  yield call(listSagas.reloadData)
}

export function* resetPreferences() {
  const listState = yield select(listSagas.entityListSelector)
  yield call(rest.deleteUserPreferences, `${listState.formName}_list.*`)
  yield call(listSagas.setSorting)
  yield call(listSagas.reloadData)
}

export function* displayColumnModal() {
  const {formDefinition} = yield select(listSagas.listSelector)
  const {columns: preferencesColumns} = yield select(preferencesSelector)
  const formColumns = getTableColumns(formDefinition, preferencesColumns)

  const answerChannel = yield call(channel)
  yield put(notifier.modalComponent(
    `${formDefinition.id}-column-selection`,
    'client.entity-list.preferences.columns',
    null,
    ({close}) => {
      const onOk = columns => {
        close()
        answerChannel.put(columns)
      }

      return <ColumnPicker columns={formColumns} onOk={onOk}/>
    },
    true
  ))

  yield saveColumnPreferences(answerChannel, preferencesColumns, formDefinition)
}

function* saveColumnPreferences(answerChannel, preferencesColumns, formDefinition) {
  const selectedColumns = yield take(answerChannel)
  yield put(setColumns({...preferencesColumns, ...selectedColumns}))
  if (Object.entries(selectedColumns).some(([, value]) => value)) {
    yield put(listActions.refresh())
  }
  const columnPreferences = yield call(util.getColumnPreferencesToSave, formDefinition.id, selectedColumns)
  yield call(rest.savePreferences, columnPreferences)
}

export function* resetColumns() {
  const listState = yield select(listSagas.entityListSelector)
  yield all([
    call(rest.deleteUserPreferences, `${listState.formName}_list.*.position`),
    call(rest.deleteUserPreferences, `${listState.formName}_list.*.hidden`)
  ])
  yield put(listActions.refresh())
}
