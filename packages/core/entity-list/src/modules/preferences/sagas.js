import {channel} from 'redux-saga'
import {all, call, put, select, take, takeLatest} from 'redux-saga/effects'
import {rest, notification} from 'tocco-app-extensions'

import ColumnModal from '../../components/ColumnModal'
import SelectNumRows from '../../components/Table/SelectRowNums'
import {getTableColumns} from '../../util/api/forms'
import * as util from '../../util/preferences'
import * as listActions from '../list/actions'
import * as listSagas from '../list/sagas'
import {setPositions, setSorting, setColumns, setPreferencesLoaded, setNumberOfTableRows} from './actions'
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
    takeLatest(actions.DISPLAY_COLUMN_MODAL, displayColumnModal),
    takeLatest(actions.DISPLAY_TABLE_ROWS_MODAL, displayTableRowsModal)
  ])
}

export function* loadPreferences() {
  const inputState = yield select(inputSelector)
  const formName = `${inputState.formName}_${inputState.scope}`
  const preferences = yield call(rest.fetchUserPreferences, `${formName}*`)
  yield put(setPositions(util.getPositions(preferences)))
  yield put(setSorting(util.getSorting(preferences)))
  yield put(setColumns(util.getColumns(preferences)))
  yield put(actions.setNumberOfTableRows(Number(preferences[`${formName}.numOfRows`])))
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
  const inputState = yield select(inputSelector)
  const formName = `${inputState.formName}_${inputState.scope}`
  yield call(rest.deleteUserPreferences, `${formName}.*.positions`)
  const positionPreferences = yield call(util.getPositionsPreferencesToSave, formName, newPositions)
  yield call(rest.savePreferences, positionPreferences)
}

export function* saveSorting() {
  const {sorting: sortings} = yield select(listSagas.listSelector)
  if (sortings.length > 0) {
    const inputState = yield select(inputSelector)
    const formName = `${inputState.formName}_${inputState.scope}`
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

export function* saveNumberOfTableRows(answerChannel) {
  const {numOfRows} = yield take(answerChannel)
  const inputState = yield select(inputSelector)

  yield put(setNumberOfTableRows(Number(numOfRows)))
  yield call(listSagas.reloadData)
  yield call(rest.savePreferences, {[`${inputState.formName}_${inputState.scope}.numOfRows`]: Number(numOfRows)})
}

export function* resetSorting() {
  const inputState = yield select(inputSelector)
  yield all([
    call(rest.deleteUserPreferences, `${inputState.formName}_${inputState.scope}.sortingField*`),
    call(rest.deleteUserPreferences, `${inputState.formName}_${inputState.scope}.sortingDirection*`)
  ])
  yield call(listSagas.setSorting)
  yield call(listSagas.reloadData)
}

export function* resetPreferences() {
  const inputState = yield select(inputSelector)
  yield call(rest.deleteUserPreferences, `${inputState.formName}_${inputState.scope}.*`)
  yield call(listSagas.setSorting)
  yield call(listSagas.reloadData)
}

export function* displayColumnModal() {
  const {formDefinition} = yield select(listSagas.listSelector)
  const {columns: preferencesColumns} = yield select(preferencesSelector)
  const {parent} = yield select(inputSelector)
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

export function* displayTableRowsModal() {
  const {formDefinition} = yield select(listSagas.listSelector)
  const answerChannel = yield call(channel)
  const {numOfRows: preferencesNumOfRows} = yield select(preferencesSelector)

  yield put(
    notification.modal(
      `${formDefinition.id}-numOfRows-setting`,
      'client.entity-list.preferences.numOfRows',
      null,
      ({close}) => {
        const onOk = numOfRows => {
          close()
          answerChannel.put({numOfRows})
        }

        return <SelectNumRows onOk={onOk} numOfRows={preferencesNumOfRows} />
      },
      true
    )
  )

  yield call(saveNumberOfTableRows, answerChannel)
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
  const inputState = yield select(inputSelector)
  yield all([
    call(rest.deleteUserPreferences, `${inputState.formName}_${inputState.scope}.*.position`),
    call(rest.deleteUserPreferences, `${inputState.formName}_${inputState.scope}.*.hidden`)
  ])
  yield put(listActions.refresh())
}
