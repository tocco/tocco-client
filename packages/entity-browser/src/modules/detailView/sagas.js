import {takeLatest, takeEvery} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'
import * as api from '../../util/api'

export const detailViewSelector = state => state.detailView

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.LOAD_ENTITY, loadEntity),
    fork(takeEvery, actions.SAVE_ENTITY, saveEntity)
  ]
}

export function* initialize({payload}) {
  const {entityName, formBase} = payload

  yield put(actions.setEntityName(entityName))
  const detailFormDefinition = yield call(api.fetchDetailForm, formBase + '_detail', 'table')
  yield put(actions.setFormDefinition(detailFormDefinition))
}

export function* loadEntity({payload}) {
  const {entityId} = payload
  const listView = yield select(detailViewSelector)
  const {entityName, formDefinition} = listView
  const entity = yield call(api.fetchEntity, entityName, entityId, formDefinition)

  yield put(actions.setEntity(entity))
}

export function* saveEntity({payload}) {
  console.log('would save entity:', payload.entity)
}
