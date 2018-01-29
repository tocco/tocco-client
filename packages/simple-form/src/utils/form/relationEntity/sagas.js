import * as relationEntitiesActions from './actions'
import {call, put, select} from 'redux-saga/effects'
import {fetchEntities} from '../../../../tocco-util/src/rest'

export const selector = state => state.simpleForm

export function* loadRelationEntity({payload}) {
  const {entityName} = payload
  const {relationEntities} = yield select(selector)
  if (!relationEntities[entityName] || !relationEntities[entityName].loaded) {
    const entities = yield call(fetchEntities, entityName, {limit: 30}, selectEntitiesTransformer)
    yield put(relationEntitiesActions.setRelationEntity(entityName, entities, true))
    yield put(relationEntitiesActions.setRelationEntityLoaded(entityName))
    return entities
  }
  return relationEntities[entityName].data
}

export const selectEntitiesTransformer = json => (json.data.map(e => ({display: e.display, key: e.key})))
