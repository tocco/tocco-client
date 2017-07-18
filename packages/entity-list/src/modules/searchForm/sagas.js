import {call, put, fork, select, takeLatest, take, all} from 'redux-saga/effects'
import * as actions from './actions'
import {fetchForm, searchFormTransformer} from '../../util/api/forms'
import {getInitialFromValues} from '../../util/searchForm'
import {fetchEntities, selectEntitiesTransformer} from '../../util/api/entities'
import {INITIALIZED} from '../entityList/actions'
import {initialize as initializeForm} from 'redux-form'

export const searchFormSelector = state => state.searchForm
export const entityListSelector = state => state.entityList

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.SET_PRESELECTED_SEARCH_FIELDS, setPreselectedSearchFields),
    fork(takeLatest, actions.LOAD_RELATION_ENTITY, loadRelationEntity)
  ])
}

export function* loadSearchForm(formDefinition, searchFormName) {
  if (!formDefinition.children) {
    formDefinition = yield call(fetchForm, searchFormName, searchFormTransformer)
    yield put(actions.setFormDefinition(formDefinition))
  }

  return formDefinition
}

export function* setPreselectedSearchFields({payload}) {
  const {preselectedSearchFields} = payload

  const entityModel = yield call(getEntityModel)
  const formValues = yield call(getInitialFromValues, preselectedSearchFields, entityModel, loadRelationEntity)
  yield put(initializeForm('searchForm', formValues))
}

export function* getEntityModel() {
  let entityList = yield select(entityListSelector)
  if (!entityList.initialized) {
    yield take(INITIALIZED)
  }

  entityList = yield select(entityListSelector)

  return entityList.entityModel
}

export function* initialize() {
  const {formDefinition, searchFormName} = yield select(searchFormSelector)
  yield call(loadSearchForm, formDefinition, searchFormName)
}

export function* loadRelationEntity({payload}) {
  const {entityName} = payload
  const {relationEntities} = yield select(searchFormSelector)
  if (!relationEntities[entityName] || !relationEntities[entityName].loaded) {
    const entities = yield call(fetchEntities, entityName, {}, selectEntitiesTransformer)
    yield put(actions.setRelationEntity(entityName, entities, true))
    yield put(actions.setRelationEntityLoaded(entityName))
    return entities
  }
  return relationEntities[entityName].data
}
