import fetch from 'isomorphic-fetch'
import {takeLatest, takeEvery, delay} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'

import {SET_SEARCH_TERM} from './searchTerm/actions'
import {SET_ORDERING} from './ordering/actions'
import {receiveEntities, receiveLazyLoadedEntities, clearEntityList, requestEntities, REQUEST_ENTITIES, LAZY_LOAD}
  from './data/actions'
import {SET_ENTITY_MODEL} from './entityModel/actions'
import {initList} from './actions'

export function loadEntities(model, searchTerm, ordering, offSet) {
  return new Promise(resolve => {
    const sort = ordering ? (ordering.name + ' ' + ordering.direction) : ''
    const entitiesRestUrl = `${__BACKEND_URL__}/nice2/rest/entities/`
    const url = `${entitiesRestUrl}/${model}?_search=${searchTerm}&_sort=${sort}&_offset=${offSet}&_limit=${3}`
    fetch(url, {
      credentials: 'include'
    }).then(response => resolve(response.json()))
  })
}

function* fetchEntities() {
  const listState = yield select(state => state.list)
  const {entityModel, searchTerm, ordering} = listState
  yield call(delay, 300)
  const entities = yield call(loadEntities, entityModel, searchTerm, ordering, 0)
  yield put(receiveEntities(entities))
}

function* lazyFetchEntities() {
  const listState = yield select(state => state.list)
  const {entityModel, searchTerm, ordering} = listState
  const offSet = listState.data.length
  const entities = yield call(loadEntities, entityModel, searchTerm, ordering, offSet)
  yield put(receiveLazyLoadedEntities(entities))
}

export function* clearListAndRequestEntities() {
  yield put(clearEntityList())
  yield put(requestEntities())
}

export function* initListAndRequestEntites() {
  yield put(initList())
  yield put(requestEntities())
}

export default function* sagas() {
  yield [
    fork(takeLatest, REQUEST_ENTITIES, fetchEntities),
    fork(takeLatest, SET_ORDERING, clearListAndRequestEntities),
    fork(takeLatest, SET_SEARCH_TERM, clearListAndRequestEntities),
    fork(takeEvery, LAZY_LOAD, lazyFetchEntities),
    fork(takeLatest, SET_ENTITY_MODEL, initListAndRequestEntites)
  ]
}
