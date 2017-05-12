import {put, fork, select, call, takeLatest, all} from 'redux-saga/effects'
import _isEmpty from 'lodash/isEmpty'

import * as actions from './actions'
import {fetchModel, fetchEntities, selectEntitiesTransformer} from '../../../util/api/entities'

export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.LOAD_RELATION_ENTITY, loadRelationEntity),
    fork(takeLatest, actions.LOAD_REMOTE_ENTITY, loadRemoteEntity)
  ])
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
    const entities = yield call(fetchEntities, entityName, {}, selectEntitiesTransformer)
    yield put(actions.setRelationEntity(entityName, entities, true))
    yield put(actions.setRelationEntityLoaded(entityName))
  }
}

export function* loadRemoteEntity({payload}) {
  const {field, entityName, searchTerm} = payload
  yield put(actions.setRemoteEntityLoading(field))

  const fetchParams = {
    limit: 100,
    searchInputs: {'_search': searchTerm}
  }

  if (searchTerm) {
    fetchParams.searchInputs = {'_search': searchTerm}
  }

  const entities = yield call(fetchEntities, entityName, fetchParams, selectEntitiesTransformer)
  yield put(actions.setRemoteEntity(field, entities))
}
