import {channel} from 'redux-saga'
import {all, call, put, select, take, takeLatest} from 'redux-saga/effects'
import {rest, notification} from 'tocco-app-extensions'

import ColumnModal from '../../components/ColumnModal'
import {getTableColumns} from '../../util/api/forms'
import * as util from '../../util/preferences'
import * as listActions from '../list/actions'
import * as listSagas from '../list/sagas'
import {setPositions, setSorting, setColumns, setPreferencesLoaded} from './actions'
import * as actions from './actions'

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
  const entityListState = yield select(listSagas.entityListSelector)
  const listState = yield select(listSagas.listSelector)
  const formName = `${entityListState.formName}_${listState.scope}`
  const preferences = yield call(rest.fetchUserPreferences, `${formName}*`)
  yield put(setPositions(util.getPositions(preferences)))
  yield put(setSorting(util.getSorting(preferences)))
  yield put(setColumns(util.getColumns(preferences)))
  yield put(setPreferencesLoaded(true))
}

export function* changePosition({payload}) {
  const {field, afterFieldPosition, columns} = payload
  let {positions} = yield select(preferencesSelector)

  if (Object.keys(positions).length === 0) {
    positions = yield call(util.getPositionsFromColumns, columns)
  }

  const newPositions = yield call(util.changePosition, positions, field, afterFieldPosition)
  yield put(setPositions(newPositions))
  const entityListState = yield select(listSagas.entityListSelector)
  const listState = yield select(listSagas.listSelector)
  const formName = `${entityListState.formName}_${listState.scope}`
  yield call(rest.deleteUserPreferences, `${formName}.*.positions`)
  const positionPreferences = yield call(util.getPositionsPreferencesToSave, formName, newPositions)
  yield call(rest.savePreferences, positionPreferences)
}

export function* saveSorting() {
  const {sorting: sortings} = yield select(listSagas.listSelector)
  if (sortings.length > 0) {
    const entityListState = yield select(listSagas.entityListSelector)
    const listState = yield select(listSagas.listSelector)
    const formName = `${entityListState.formName}_${listState.scope}`
    yield all([
      call(rest.deleteUserPreferences, `${formName}.sortingField*`),
      call(rest.deleteUserPreferences, `${formName}.sortingDirection*`)
    ])
    const sortingPreferences = sortings
      .slice(1)
      .map((sorting, index) => util.getAdditionalSortingPreferencesToSave(formName, sorting, index + 1))
      .reduce(
        (acc, sorting) => ({
          ...acc,
          ...sorting
        }),
        util.getSortingPreferencesToSave(formName, sortings[0])
      )
    yield call(rest.savePreferences, sortingPreferences)
  }
}

export function* resetSorting() {
  const entityListState = yield select(listSagas.entityListSelector)
  const listState = yield select(listSagas.listSelector)
  yield all([
    call(rest.deleteUserPreferences, `${entityListState.formName}_${listState.scope}.sortingField*`),
    call(rest.deleteUserPreferences, `${entityListState.formName}_${listState.scope}.sortingDirection*`)
  ])
  yield call(listSagas.setSorting)
  yield call(listSagas.reloadData)
}

export function* resetPreferences() {
  const entityListState = yield select(listSagas.entityListSelector)
  const listState = yield select(listSagas.listSelector)
  yield call(rest.deleteUserPreferences, `${entityListState.formName}_${listState.scope}.*`)
  yield call(listSagas.setSorting)
  yield call(listSagas.reloadData)
}

export function* displayColumnModal() {
  const {formDefinition} = yield select(listSagas.listSelector)
  const {columns: preferencesColumns} = yield select(preferencesSelector)
  const {parent} = yield select(listSagas.entityListSelector)
  const formColumns = getTableColumns(formDefinition, parent, preferencesColumns)

  const answerChannel = yield call(channel)
  yield put(
    notification.modal(
      `${formDefinition.id}-column-selection`,
      'client.entity-list.preferences.columns',
      null,
      ({close}) => {
        const onOk = columns => {
          close()
          answerChannel.put(columns)
        }

        return <ColumnModal onOk={onOk} initialColumns={formColumns} dndEnabled={false} />
      },
      true
    )
  )

  yield saveColumnPreferences(answerChannel, preferencesColumns, formDefinition)
}

function* saveColumnPreferences(answerChannel, preferencesColumns, formDefinition) {
  const columns = (yield take(answerChannel)).reduce(
    (accumulator, item) => ({
      ...accumulator,
      [item.id]: !item.hidden
    }),
    {}
  )
  const diffColumns = Object.keys(columns).reduce(
    (accumulator, columnName) => ({
      ...accumulator,
      ...(columns[columnName] !== preferencesColumns[columnName] ? {[columnName]: columns[columnName]} : {})
    }),
    {}
  )
  yield put(setColumns(columns))
  if (Object.entries(diffColumns).some(([, value]) => value)) {
    yield put(listActions.refresh())
  }
  const columnPreferences = yield call(util.getColumnPreferencesToSave, formDefinition.id, diffColumns)
  yield call(rest.savePreferences, columnPreferences)
}

export function* resetColumns() {
  const entityListState = yield select(listSagas.entityListSelector)
  const listState = yield select(listSagas.listSelector)
  yield all([
    call(rest.deleteUserPreferences, `${entityListState.formName}_${listState.scope}.*.position`),
    call(rest.deleteUserPreferences, `${entityListState.formName}_${listState.scope}.*.hidden`)
  ])
  yield put(listActions.refresh())
}
