import {all, call, fork, put, select, takeEvery} from 'redux-saga/effects'

import * as relationEntitiesActions from './actions'
import {fetchEntities} from '../../rest'

export default function* sagas() {
  yield all([
    fork(takeEvery, relationEntitiesActions.LOAD_RELATION_ENTITIES, loadRelationEntity)
  ])
}

export function* loadRelationEntity({payload: {fieldName, entityName, options = {}}}) {
  const fieldData = yield select(fieldDataSelector, fieldName)
  if (!dataLoaded(fieldData) || options.forceReload) {
    yield put(relationEntitiesActions.setRelationEntityLoading(fieldName))
    const fetchParams = yield call(getFetchParams, options)
    const entities = yield call(fetchEntities, entityName, fetchParams, selectEntitiesTransformer)
    const moreEntitiesAvailable = options.limit ? entities.length > options.limit : false
    yield put(
      relationEntitiesActions.setRelationEntities(
        fieldName, options.limit ? entities.splice(0, options.limit) : entities, moreEntitiesAvailable)
    )
  }
}

export const fieldDataSelector = (state, fieldName) => state.formData.relationEntities[fieldName]

const dataLoaded = fieldData => !!(fieldData && fieldData.data && fieldData.data.length > 0)

const getFetchParams = options => (
  {
    ...(options.limit ? {limit: options.limit + 1} : {}),
    ...(options.searchTerm ? {searchInputs: {_search: options.searchTerm}} : {}),
    ...(options.orderBy ? {orderBy: options.orderBy} : {}),
    fields: [],
    relations: []
  }
)

const selectEntitiesTransformer = json => (json.data.map(e => ({display: e.display, key: e.key})))
