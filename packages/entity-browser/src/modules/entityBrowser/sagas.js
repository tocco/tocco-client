import {takeEvery} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'

export const entityBrowserSelector = state => state.entityBrowser

function fetchRequest(entityName) {
  const options = {
    method: 'GET',

    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: 'include'
  }

  return fetch(`${__BACKEND_URL__}/nice2/rest/entities/${entityName}`, options)
}

function requestRecords(entityName) {
  return fetchRequest(entityName)
    .then(resp => resp.json())
    .then(json => json.data.map(e => e.fields))
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

export function* fetchRecords() {
  const entityBrowser = yield select(entityBrowserSelector)

  const {entityName} = entityBrowser
  const records = yield call(requestRecords, entityName)
  const columnDefinition = yield call(requestColumnDefinition, entityName, '')

  yield put(actions.setColumnDefinition(columnDefinition))
  yield put(actions.setRecords(records))
}

export default function* sagas() {
  yield [
    fork(takeEvery, actions.REQUEST_RECORDS, fetchRecords)
  ]
}
