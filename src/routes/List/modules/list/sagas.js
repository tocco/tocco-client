import fetch from 'isomorphic-fetch'
import {takeLatest, delay} from 'redux-saga'
import {call, put, fork, take, select} from 'redux-saga/effects'
import * as actions from './actions'
import {SET_SEARCH_TERM} from '../searchTerm';
import {SET_ORDERING} from '../ordering';
import {LAZY_LOAD} from '../lazyLoad';

export function loadEntities(model, searchTerm, ordering, offSet) {
  return new Promise(resolve => {

    const sort = ordering ? (ordering.name + ' ' + ordering.direction) : ''

    fetch(`${__BACKEND_URL__}/nice2/rest/entities/${model}?_search=${searchTerm}&_sort=${sort}&_offset=${offSet}&_limit=${3}`, {
      credentials: 'include'
    }).then(response => resolve(response.json()))
  })
}

function* fetchEntities() {
  var listState = yield select(state => state.list)
  const {entityModel, searchTerm, ordering} = listState
  var offSet = listState.list.length;
  yield call(delay, 300)
  const entities = yield call(loadEntities, entityModel, searchTerm, ordering, offSet)
  yield put(actions.receiveEntities(entities))
}

export function* searchTermWatcher() {
    yield put(actions.clearEntityList())
    yield call(fetchEntities)
}

export function* orderingWatcher() {
    yield put(actions.clearEntityList())
    yield call(fetchEntities)
}

export default function* sagas() {
  yield [
    fork(takeLatest, actions.REQUEST_ENTITIES, fetchEntities),
    fork(takeLatest, SET_ORDERING, orderingWatcher),
    fork(takeLatest, LAZY_LOAD, fetchEntities),
    fork(takeLatest,SET_SEARCH_TERM, searchTermWatcher)
  ]
}
