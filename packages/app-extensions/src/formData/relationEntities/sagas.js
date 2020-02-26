import {all, call, put, select, takeEvery} from 'redux-saga/effects'
import _pick from 'lodash/pick'
import {api} from 'tocco-util'

import * as relationEntitiesActions from './actions'
import rest from '../../rest'

export default function* sagas() {
  yield all([
    takeEvery(relationEntitiesActions.LOAD_RELATION_ENTITIES, loadRelationEntity)
  ])
}

export function* enhanceEntitiesWithDisplays(entities) {
  const requestedDisplays = yield call(api.getDisplayRequest, entities)
  const displays = yield call(rest.fetchDisplays, requestedDisplays)
  return entities.map(entity => ({...entity, display: displays[entity.model][entity.key]}))
}

export function* loadRelationEntity({payload: {fieldName, entityName, options = {}}}) {
  const fieldData = yield select(fieldDataSelector, fieldName)
  if (!dataLoaded(fieldData) || options.forceReload) {
    yield put(relationEntitiesActions.setRelationEntityLoading(fieldName))
    const query = yield call(getQuery, options)
    const requestOptions = {
      method: 'GET'
    }

    let entities = yield call(rest.fetchEntities, entityName, query, requestOptions)
    entities = yield call(enhanceEntitiesWithDisplays, entities)
    entities = entities.map(entity => _pick(entity, api.relevantRelationAttributes))
    const moreEntitiesAvailable = options.limit ? entities.length > options.limit : false
    yield put(
      relationEntitiesActions.setRelationEntities(
        fieldName, options.limit ? entities.splice(0, options.limit) : entities, moreEntitiesAvailable)
    )
  }
}

export const fieldDataSelector = (state, fieldName) => state.formData.relationEntities.data[fieldName]

const dataLoaded = fieldData => !!(fieldData && fieldData.data && fieldData.data.length > 0)

export const getQuery = options => (
  {
    ...(options.limit ? {limit: options.limit + 1} : {}),
    ...(options.searchTerm ? {search: options.searchTerm} : {}),
    ...(options.sorting ? {sorting: options.sorting} : {})
  }
)
