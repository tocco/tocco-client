import {takeEvery} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'

export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield [
    fork(takeEvery, actions.INITIALIZE_TABLE, initializeEntityBrowser),
    fork(takeEvery, actions.REQUEST_RECORDS, requestRecords)
  ]
}

export function* requestRecords() {
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName, limit, currentPage, recordsCache} = entityBrowser

  if (recordsCache[currentPage]) {
    yield put(actions.setRecords(recordsCache[currentPage]))
  } else {
    const records = yield call(requestRecordsOfPage, entityName, currentPage, limit)
    yield put(actions.setRecords(records))
    yield put(actions.addRecordsToCache(currentPage, records))
  }
}

export function* initializeEntityBrowser() {
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName} = entityBrowser

  const columnDefinition = yield call(requestColumnDefinition, entityName, '')
  yield put(actions.setColumnDefinition(columnDefinition))

  yield call(resetDataSet)
  yield call(requestRecords)
}

export function* resetDataSet() {
  const entityBrowser = yield select(entityBrowserSelector)
  const {entityName} = entityBrowser
  const recordCount = yield call(requestRecordCount, entityName)
  yield put(actions.setRecordCount(recordCount))
  yield put(actions.clearRecordsCache())
  yield put(actions.setRecords([]))
  yield put(actions.setCurrentPage(1))
}

const getParameterString = params => {
  if (!params) {
    return ''
  }

  const valueStrings = []
  for (let propyName in params) {
    valueStrings.push(`${propyName}=${params[propyName]}`)
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

function requestRecordsOfPage(entityName, page, limit) {
  const params = {
    '_limit': limit,
    '_offset': (page - 1) * limit
  }

  return fetchRequest(`entities/${entityName}`, params)
    .then(resp => resp.json())
    .then(json => json.data.map(e => e.fields))
}

function requestRecordCount(entityName) {
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
