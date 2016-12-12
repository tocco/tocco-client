import {takeEvery, takeLatest} from 'redux-saga'
import {call, put, fork, select, spawn} from 'redux-saga/effects'
import * as actions from './actions'
import * as api from '../../util/api'

export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE_TABLE, initializeEntityBrowser),
    fork(takeLatest, actions.CHANGE_PAGE, changePage),
    fork(takeLatest, actions.REQUEST_RECORDS, requestRecords),
    fork(takeEvery, actions.SET_ORDER_BY, resetDataSet),
    fork(takeEvery, actions.SET_SEARCH_TERM, resetDataSet),
    fork(takeEvery, actions.RESET_DATA_SET, resetDataSet)
  ]
}

export function* changePage({payload}) {
  const {page} = payload
  yield put(actions.setCurrentPage(page))
  yield put(actions.requestRecords(page))
}

export function* fetchRecordsAndAddToStore(page) {
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName, orderBy, limit, recordStore, searchTerm, columnDefinition} = entityBrowser

  if (!recordStore[page]) {
    const records = yield call(api.fetchRecords, entityName, page, orderBy, limit, searchTerm, columnDefinition)
    yield put(actions.addRecordsToStore(page, records))
  }
}

export function* requestRecords({payload}) {
  const {page} = payload

  yield put(actions.setRecordRequestInProgress(true))

  const entityBrowser = yield select(entityBrowserSelector)
  let {recordStore} = entityBrowser

  if (!recordStore[page]) {
    yield call(fetchRecordsAndAddToStore, page)
  }

  yield call(displayRecord, page)
  yield put(actions.setRecordRequestInProgress(false))

  if ((entityBrowser.limit * page) < entityBrowser.recordCount) {
    yield spawn(fetchRecordsAndAddToStore, page + 1)
  }
}

export function* displayRecord(page) {
  const entityBrowser = yield select(entityBrowserSelector)
  const records = entityBrowser.recordStore[page]
  yield put(actions.setRecords(records))
}

export function* initializeEntityBrowser() {
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName} = entityBrowser

  console.log('entityName', entityName)
  const [searchFormDefinition, columnDefinition] = yield [
    call(api.fetchSearchForm, entityName + '_search'),
    call(api.fetchColumnDefinition, entityName + '_list', 'table')
  ]
  yield put(actions.setSearchFormDefinition(searchFormDefinition))
  yield put(actions.setColumnDefinition(columnDefinition))

  yield call(resetDataSet)
}

export function* resetDataSet() {
  yield put(actions.setRecords([]))
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName, searchTerm} = entityBrowser
  const recordCount = yield call(api.fetchRecordCount, entityName, searchTerm)
  yield put(actions.setRecordCount(recordCount))
  yield put(actions.clearRecordStore())

  yield call(changePage, {payload: {page: 1}})
}
