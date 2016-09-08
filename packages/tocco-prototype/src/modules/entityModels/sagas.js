import fetch from 'isomorphic-fetch'
import { takeEvery } from 'redux-saga'
import { call, put, fork, select } from 'redux-saga/effects'
import * as actions from './actions'

export const entityModelsSelector = state => state.entityModels

export function loadModels() {
  return new Promise(resolve => {
    return fetch(`${__BACKEND_URL__}/nice2/rest/entities`, {
      credentials: 'include'
    }).then(response => resolve(response.json()))
  })
}

export function* fetchEntityModels() {
  const models = yield select(entityModelsSelector)
  if (models.length > 0) {
    return
  }
  const json = yield call(loadModels)
  yield put(actions.receiveEntityModels(json))
}

export default function* sagas() {
  yield [
    fork(takeEvery, actions.REQUEST_ENTITY_MODELS, fetchEntityModels)
  ]
}
