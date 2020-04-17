import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'

export const inputSelector = state => state.input
export const inputEditTableSelector = state => state.inputEditTable
export const searchQueriesSelector = state => state.inputEditSearch.searchQueries
export const inputEditPaginationSelector = state => state.inputEditPagination

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE_TABLE, initialize),
    takeLatest(actions.LOAD_DATA, loadData),
    takeEvery(actions.UPDATE_VALUE, updateValue),
    takeLatest(actions.SET_SORTING, sortData)
  ])
}

export function* initialize() {
  const {inputEntityKey} = yield select(inputSelector)
  const [editForm, dataForm] = yield all([
    call(rest.requestSaga, `inputEdit/${inputEntityKey}/form`),
    call(rest.fetchForm, 'Input_edit_data', 'list')
  ])
  yield put(actions.setEditForm({inputEditForm: editForm.body}))
  yield put(actions.setDataForm({inputDataForm: dataForm}))
  yield call(loadData, {})
}

export function* sortData({payload: {sorting}}) {
  yield call(loadData, {newSorting: sorting})
}

export function* loadData({newSorting, newSearchQueries, newPage}) {
  const {inputEntityKey} = yield select(inputSelector)
  const sorting = newSorting || (yield select(inputEditTableSelector)).sorting
  const searchQueries = newSearchQueries || (yield select(searchQueriesSelector))
  const currentPage = newPage || (yield select(inputEditPaginationSelector)).currentPage
  const {recordsPerPage} = yield select(inputEditPaginationSelector)
  const dataForm = (yield select(inputEditTableSelector)).inputDataForm
  const paths = getPathsFromTable(dataForm)
  const searchBean = rest.buildRequestQuery({
    limit: recordsPerPage,
    sorting: [{field: sorting.field, order: sorting.direction}],
    page: currentPage,
    tql: searchQueries.join(' and '),
    paths: paths
  })
  const response = yield call(rest.requestSaga, `inputEdit/${inputEntityKey}/data/search`, {
    method: 'POST',
    body: searchBean
  })
  yield put(actions.setData(response.body))
}

function getPathsFromTable(dataForm) {
  const paths = dataForm.children
    .find(child => child.componentType === 'table')
    .children
    .flatMap(column => column.children.map(field => field.path))
  paths.push('pk')
  return paths
}

export function* updateValue({payload: {inputDataKey, node, value}}) {
  const {inputEntityKey} = yield select(inputSelector)
  yield put(actions.setValue(inputDataKey, node, value))
  const response = yield call(rest.requestSaga, `inputEdit/${inputEntityKey}/data`,
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
