import _get from 'lodash/get'
import _pick from 'lodash/pick'
import {all, call, put, select, takeEvery} from 'redux-saga/effects'
import {api} from 'tocco-util'

import form from '../../form'
import rest from '../../rest'
import * as relationEntitiesActions from './actions'

export default function* sagas() {
  yield all([takeEvery(relationEntitiesActions.LOAD_RELATION_ENTITIES, loadRelationEntity)])
}

export function* enhanceEntitiesWithDisplays(entities) {
  const requestedDisplays = yield call(api.getDisplayRequest, entities)
  const displays = yield call(rest.fetchDisplays, requestedDisplays)
  return entities.map(entity => ({...entity, display: displays[entity.model][entity.key]}))
}

export function* loadRelationEntity({payload: {fieldName, entityName, options = {}}}) {
  const fieldData = yield select(fieldDataSelector, fieldName)
  if (!dataLoaded(fieldData) || options.forceReload) {
    if (!options.constriction && options.loadRemoteFieldConstriction) {
      options.constriction = yield call(loadRemoteFieldConstriction, entityName, options.formName, options.formBase)
    }

    const clearData = fieldData?.searchTerm !== options.searchTerm
    yield put(relationEntitiesActions.setRelationEntityLoading(fieldName, clearData))
    const query = yield call(getQuery, options)
    const requestOptions = {
      method: 'GET'
    }

    const model = yield call(rest.fetchModel, entityName)
    if (_get(model, 'paths.active.type') === 'boolean') {
      query.where = query.where ? `${query.where} and active` : 'active'
    }
    let entities = yield call(rest.fetchEntities, entityName, query, requestOptions)
    entities = yield call(enhanceEntitiesWithDisplays, entities)
    entities = entities.map(entity => _pick(entity, api.relevantRelationAttributes))
    const moreEntitiesAvailable = options.limit ? entities.length > options.limit : false
    yield put(
      relationEntitiesActions.setRelationEntities(
        fieldName,
        options.limit ? entities.splice(0, options.limit) : entities,
        moreEntitiesAvailable,
        options.searchTerm
      )
    )
  }
}

export function* loadRemoteFieldConstriction(entityName, formName, formBase) {
  const remoteFieldFormName = formName ? `${entityName}_${formName}` : formBase || entityName
  const remoteFieldFormDefinition = yield call(rest.fetchForm, remoteFieldFormName, 'remotefield')
  return yield call(getConstriction, remoteFieldFormDefinition)
}

export const getConstriction = formDefinition => {
  const table = getTable(formDefinition)
  return table.constriction || null
}

export const getTable = formDefinition =>
  formDefinition.children.find(child => child.componentType === form.componentTypes.TABLE)

export const fieldDataSelector = (state, fieldName) => state.formData.relationEntities.data[fieldName]

const dataLoaded = fieldData => !!fieldData?.data?.length > 0

export const getQuery = options => ({
  ...(options.limit ? {limit: options.limit + 1} : {}),
  ...(options.searchTerm ? {search: options.searchTerm} : {}),
  ...(options.sorting ? {sorting: options.sorting} : {}),
  ...(options.constriction ? {constriction: options.constriction} : {}),
  ...(options.formName ? {form: options.formName} : {}),
  ...(options.where ? {where: options.where} : {})
})
