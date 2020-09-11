import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import {setTotalCount} from '../inputEditPagination/actions'
import {transformResponseData} from './utils'

export const inputSelector = state => state.input
export const inputEditSelector = state => state.inputEdit
export const inputEditTableSelector = state => state.inputEditTable
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

export function* processDataForm(dataForm) {
  const actionDefinitions = dataForm.children
    .find(child => child.id === 'main-action-bar')
    .children
    .filter(child => child.componentType === 'action')
    .map(child => ({...child, scope: 'detail'}))

  yield put(actions.setActionDefinitions(actionDefinitions))

  const dataFormColumns = dataForm.children.find(child => child.componentType === 'table').children

  yield put(actions.setDataFormColumns(dataFormColumns))
}

export function* initialize() {
  const {selection, validation} = yield select(inputEditSelector)
  if (validation.valid) {
    const {actionProperties} = yield select(inputSelector)
    const inputEditDataForm = actionProperties && actionProperties.inputEditDataForm
      ? actionProperties.inputEditDataForm
      : 'Input_edit_data'
    const [editForm, dataForm] = yield all([
      call(rest.requestSaga, 'inputEdit/form', {method: 'POST', body: selection}),
      call(rest.fetchForm, inputEditDataForm, 'list')
    ])
    yield put(actions.setEditForm({inputEditForm: editForm.body}))
    yield call(processDataForm, dataForm)
    yield call(loadData, {})
  }
}

export function* loadData({newSorting, newSearchQueries, newPage}) {
  yield put(actions.setDataLoadingInProgress(true))
  const {selection} = yield select(inputEditSelector)
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
    tql: searchQueries.join(' and '),
    paths: paths
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
  ...(dataFormColumns.flatMap(column => column.children.map(field => field.path)))
]

export function* updateValue({payload: {inputDataKey, node, value}}) {
  yield put(actions.setValue(inputDataKey, node, value))

  const response = yield call(rest.requestSaga, 'inputEdit/data',
    {
      method: 'POST',
      body: {
        inputDataKey,
        node,
        value
      }
    }
  )
  yield handleResponse(response)
}

function* handleResponse(response) {
  const values = response.body.calculatedValues
  if (values) {
    const actionsToPut = values.map(value => actions.setValue(value.inputDataKey, value.node, value.value))
    yield all(actionsToPut.map(action => put(action)))
  }
}
