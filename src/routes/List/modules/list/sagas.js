import fetch from 'isomorphic-fetch'
import { takeLatest, delay  } from 'redux-saga'
import { call, put, fork, take, select } from 'redux-saga/effects'
import * as actions from './actions'

export function loadEntities(model, searchTerm, ordering) {
  return new Promise(resolve => {
    const sort = ordering ? (ordering.name + ' ' + ordering.direction) : ''
    fetch(`${__BACKEND_URL__}/nice2/rest/entities/${model}?_search=${searchTerm}&_sort=${sort}`, {
      credentials: 'include'
    }).then(response => resolve(response.json()))
  })
}


function* fetchEntities(action) {
  const { entityModel, searchTerm, ordering, timeout } = action.payload
  yield call(delay, timeout)
  const entities = yield call(loadEntities, entityModel, searchTerm, ordering)
  yield put(actions.receiveEntities(entities))
}


export function* orderingWatcher() {
  while (true) {
    yield take('SET_ORDERING')
    const listState = yield select(state => state.list)

    yield call(fetchEntities, {payload: listState})
  }
}


export default function* sagas() {
  yield [
    fork(takeLatest, actions.REQUEST_ENTITIES, fetchEntities),
    fork(orderingWatcher)
  ]
}
