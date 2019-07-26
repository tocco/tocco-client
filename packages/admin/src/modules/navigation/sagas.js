import {rest} from 'tocco-app-extensions'

import * as actions from './actions'

import {takeLatest, fork, call, all, put} from 'redux-saga/effects'

const visibleEntities = ['Address', 'User', 'Membership', 'Institution', 'Donation']
export function* loadEntities() {
  const response = yield call(rest.requestSaga, 'entities')
  const entities = response.body.entities

  const transformed = Object.keys(entities)
    .filter(e => visibleEntities.includes(e))
    .map(k => ({entity: k, label: entities[k].metaData.label}))
  yield put(actions.setEntities(transformed))
}

export default function* mainSagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE_NAVIGATION, loadEntities)
  ])
}
