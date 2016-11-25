import {takeEvery, takeLatest, delay} from 'redux-saga'
import {call, put, fork, select, spawn} from 'redux-saga/effects'
import * as actions from './actions'

export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE_TABLE, initializeEntityBrowser),
    fork(takeLatest, actions.CHANGE_PAGE, changePage),
    fork(takeEvery, actions.REQUEST_RECORDS, requestRecords),
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
  const {entityName, limit, recordStore} = entityBrowser

  if (!recordStore[page]) {
    yield put(actions.addRecordsToStore(page, []))
    const records = yield call(fetchRecords, entityName, page, limit)
    yield put(actions.addRecordsToStore(page, records))
  }
}

export function* requestRecords({payload}) {
  const {page} = payload

  yield put(actions.setRecordRequestInProgress(true))

  const entityBrowser = yield select(entityBrowserSelector)
  let {recordStore} = entityBrowser

  if (recordStore[page]) {
    if (recordStore[page].length === 0) {
      yield call(delay, 1000)
      yield put(actions.requestRecords(page))
    }
  } else {
    yield call(fetchRecordsAndAddToStore, page)
  }

  yield call(displayRecord, page)
  yield spawn(fetchRecordsAndAddToStore, page + 1)
}

export function* displayRecord(page) {
  const entityBrowser = yield select(entityBrowserSelector)
  const records = entityBrowser.recordStore[page]
  yield put(actions.setRecords(records))

  yield put(actions.setRecordRequestInProgress(false))
}

export function* initializeEntityBrowser() {
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName} = entityBrowser

  const columnDefinition = yield call(requestColumnDefinition, entityName, '')
  yield put(actions.setColumnDefinition(columnDefinition))

  yield call(resetDataSet)
}

export function* resetDataSet() {
  yield put(actions.setRecords([]))
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName} = entityBrowser
  const recordCount = yield call(fetchRecordCount, entityName)
  yield put(actions.setRecordCount(recordCount))
  yield put(actions.clearRecordStore())
  yield put(actions.setCurrentPage(1))

  yield put(actions.requestRecords(1))
}

const getParameterString = params => {
  if (!params) {
    return ''
  }

  const valueStrings = []
  for (let param in params) {
    valueStrings.push(`${param}=${params[param]}`)
  }

  return `?${valueStrings.join('&')}`
}

const fetchRequest = (resource, params) => {
  const options = {
    method: 'GET',

    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: 'include'
  }

  const paramString = getParameterString(params)

  return fetch(`${__BACKEND_URL__}/nice2/rest/${resource}${paramString}`, options)
}

function fetchRecords(entityName, page, limit) {
  const params = {
    '_limit': limit,
    '_offset': (page - 1) * limit
  }

  return fetchRequest(`entities/${entityName}`, params)
    .then(resp => resp.json())
    .then(json => json.data.map(e => e.fields))
}

function fetchRecordCount(entityName) {
  return fetchRequest(`entities/${entityName}/count`)
    .then(resp => resp.json())
    .then(json => json.count)
}

function requestColumnDefinition(entityName, formName) {
  // TODO: Load form with rest and transform
  return [
    {
      label: 'Vorname',
      value: 'firstname',
      order: 2
    },
    {
      label: 'Nachname',
      value: 'lastname',
      order: 1
    },
    {
      label: 'Nummer',
      value: 'user_nr',
      order: 0
    }
  ]
}
