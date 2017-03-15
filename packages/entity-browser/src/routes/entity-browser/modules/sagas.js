import {put, fork, select, call, takeLatest} from 'redux-saga/effects'
import _isEmpty from 'lodash/isEmpty'

import * as actions from './actions'
import {fetchModel, fetchEntities} from '../../../util/api/entities'

export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.LOAD_RELATION_ENTITY, loadRelationEntity)
  ]
}

export function* loadEntityModel(entityName, entityModel) {
  if (_isEmpty(entityModel)) {
    const loadedModel = yield call(fetchModel, entityName)
    yield put(actions.setEntityModel(loadedModel))
  }
}

export function* initialize() {
  const {entityName, entityModel} = yield select(entityBrowserSelector)
  yield call(loadEntityModel, entityName, entityModel)
  yield put(actions.initialized())
}

export function* loadRelationEntity({payload}) {
  const {entityName} = payload
  const {relationEntities} = yield select(entityBrowserSelector)
  if (!relationEntities[entityName] || !relationEntities[entityName].loaded) {
    const entities = yield call(fetchEntities, entityName)
    const entitiesTransformed = entities.data.map(e => ({label: e.display, value: e.key}))
    yield put(actions.setRelationEntity(entityName, entitiesTransformed, true))
    yield put(actions.setRelationEntityLoaded(entityName))
  }
}
