import {takeLatest, takeEvery} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'

import {fetchEntity} from '../../util/api/entities'
import {fetchForm, getFieldsOfDetailForm} from '../../util/api/forms'

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
  const detailFormDefinition = yield call(fetchForm, formBase + '_detail')
  yield put(actions.setFormDefinition(detailFormDefinition))
}

export function* loadEntity({payload}) {
  const {entityId} = payload
  const listView = yield select(detailViewSelector)
  const {entityName, formDefinition} = listView
  const fields = yield call(getFieldsOfDetailForm, formDefinition)
  const entity = yield call(fetchEntity, entityName, entityId, fields)

  yield put(actions.setEntity(entity))
}

export function* saveEntity({payload}) {
  console.log('would save entity:', payload.entity)
}
