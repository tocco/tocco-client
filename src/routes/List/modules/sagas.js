import fetch from 'isomorphic-fetch'
import {takeLatest, delay} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'

import {SET_SEARCH_TERM} from './searchTerm/actions'
import {SET_ORDERING} from './ordering/actions'
import {REQUEST_ENTITIES, LAZY_LOAD, receiveEntities, clearEntityList} from './data/actions'
import {SET_ENTITY_MODEL} from './entityModel/actions'
import {initList} from './actions'

export function loadEntities(model, searchTerm, ordering, offSet) {
  return new Promise(resolve => {

    const sort = ordering ? (ordering.name + ' ' + ordering.direction) : ''
    var url = `${__BACKEND_URL__}/nice2/rest/entities/${model}?_search=${searchTerm}&_sort=${sort}&_offset=${offSet}&_limit=${3}`
    fetch(url, {
      credentials: 'include'
    }).then(response => resolve(response.json()))
  })
}

function* fetchEntities() {
  var listState = yield select(state => state.list)
  const {entityModel, searchTerm, ordering} = listState
  var offSet = listState.data.length
  yield call(delay, 300)
  const entities = yield call(loadEntities, entityModel, searchTerm, ordering, offSet)
  yield put(receiveEntities(entities))
}

export function* searchTermWatcher() {
  yield put(clearEntityList())
  yield call(fetchEntities)
}

export function* orderingWatcher() {
  yield put(clearEntityList())
  yield call(fetchEntities)
}

export function* entityModelWatcher() {
  yield put(initList())
}

export default function* sagas() {
  yield [
    fork(takeLatest, REQUEST_ENTITIES, fetchEntities),
    fork(takeLatest, SET_ORDERING, orderingWatcher),
    fork(takeLatest, LAZY_LOAD, fetchEntities),
    fork(takeLatest, SET_SEARCH_TERM, searchTermWatcher),
    fork(takeLatest, SET_ENTITY_MODEL, entityModelWatcher)
  ]
}
