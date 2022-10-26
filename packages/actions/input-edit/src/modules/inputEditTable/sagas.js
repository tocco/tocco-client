import {all, call, put, select, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {notification, rest} from 'tocco-app-extensions'

import * as inputEditActions from '../inputEdit/actions'
import {setTotalCount} from '../inputEditPagination/actions'
import * as searchFormActions from '../inputEditSearch/actions'
import * as actions from './actions'
import {transformResponseData} from './utils'

export const inputSelector = state => state.input
export const inputEditSelector = state => state.inputEdit
export const inputEditTableSelector = state => state.inputEditTable
export const inputEditSearchSelector = state => state.inputEditSearch
export const searchQueriesSelector = state => state.inputEditSearch.searchQueries
export const inputEditPaginationSelector = state => state.inputEditPagination

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE_TABLE, initialize),
    takeLatest(actions.LOAD_DATA, loadData),
    takeEvery(actions.UPDATE_VALUE, updateValue),
    takeLatest(actions.SET_SORTING, loadData)
  ])
}

export function* processDataForm(dataForm, readonly, readonlyActions = []) {
  const actionDefinitions = dataForm.children
    .find(child => child.id === 'main-action-bar')
    .children.filter(child => child.componentType === 'action')
    .filter(child => !readonly || readonlyActions.includes(child.id))
    .map(child => ({
      ...child,
      scope: 'detail'
    }))

  yield put(actions.setActionDefinitions(actionDefinitions))

  const dataFormColumns = dataForm.children.find(child => child.componentType === 'table').children

  yield put(actions.setDataFormColumns(dataFormColumns))
}

export function* initialize() {
  yield put(actions.setDataLoadingInProgress(true))
  const {actionProperties, selection} = yield select(inputSelector)
  const inputEditDataForm =
    actionProperties && actionProperties.inputEditDataForm ? actionProperties.inputEditDataForm : 'Input_edit_data'
  const [editFormDefinition, dataForm] = yield all([
    call(rest.requestSaga, 'inputEdit/form', {method: 'POST', body: selection}),
    call(rest.fetchForm, inputEditDataForm, 'list')
  ])
  const {editColumns, readonly, readonlyActions} = editFormDefinition.body
  if (readonly) {
    editColumns.forEach(c => (c.readonly = true))
    yield put(
      notification.toaster({
        type: 'info',
        title: 'client.actions.InputEdit.input_closed'
      })
    )
  }
  yield put(actions.setEditForm({inputEditForm: editColumns}))
  yield call(processDataForm, dataForm, readonly, readonlyActions)

  const {initialized: searchFormInitialized} = yield select(inputEditSearchSelector)
  if (!searchFormInitialized) {
    yield take(searchFormActions.SET_INITIALIZED)
  }
  const {updateInProgress} = yield select(inputEditSelector)
  if (updateInProgress) {
    yield take(({payload, type}) => type === inputEditActions.SET_UPDATE_IN_PROGRESS && !payload.updateInProgress)
  }
  yield call(loadData, {})
}

export function* loadData({newSorting, newSearchQueries, newPage}) {
  yield put(actions.setDataLoadingInProgress(true))
  const {selection} = yield select(inputSelector)
  const sorting = newSorting || (yield select(inputEditTableSelector)).sorting
  const searchQueries = newSearchQueries || (yield select(searchQueriesSelector))
  const currentPage = newPage || (yield select(inputEditPaginationSelector)).currentPage
  const {recordsPerPage} = yield select(inputEditPaginationSelector)
  const dataFormColumns = (yield select(inputEditTableSelector)).dataFormColumns
  const paths = getPathsFromTable(dataFormColumns)
  const searchBean = rest.buildRequestQuery({
    limit: recordsPerPage,
    sorting,
    page: currentPage,
    where: searchQueries.join(' and '),
    paths
  })
  const response = yield call(rest.requestSaga, 'inputEdit/data/search', {
    method: 'POST',
    body: {
      selection,
      searchBean
    }
  })

  const transformedData = yield call(transformResponseData, response)
  yield put(actions.setData(transformedData))
  yield put(setTotalCount(response.body.count))
  yield put(actions.setDataLoadingInProgress(false))
}

const getPathsFromTable = dataFormColumns => [
  'pk',
  ...dataFormColumns.flatMap(column => column.children.map(field => field.path))
]

export function* updateValue({payload: {inputDataKey, node, value}}) {
  yield put(actions.setValue(inputDataKey, node, value))
  yield put(actions.setCalculating(inputDataKey, true))

  const response = yield call(rest.requestSaga, 'inputEdit/data', {
    method: 'POST',
    body: {
      inputDataKey,
      node,
      value
    }
  })
  yield handleResponse(response, inputDataKey)
}

function* handleResponse(response, inputDataKey) {
  const values = response.body.calculatedValues
  if (values) {
    const actionsToPut = values.map(value => actions.setValue(value.inputDataKey, value.node, value.value))
    yield all(actionsToPut.map(action => put(action)))
  }
  yield put(actions.setCalculating(inputDataKey, false))
}
