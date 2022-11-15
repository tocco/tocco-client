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
  const displays = yield call(rest.fetchDisplays, requestedDisplays, 'remote')
  return entities.map(entity => ({...entity, display: displays[entity.model][entity.key]}))
}

export function* loadRelationEntity({payload: {fieldName, entityName, options = {}}}) {
  const fieldData = yield select(fieldDataSelector, fieldName)
  if (!dataLoaded(fieldData) || options.forceReload) {
    const finalOptions = yield call(finalizeOptions, entityName, options)

    const clearData = fieldData?.searchTerm !== finalOptions.searchTerm
    yield put(relationEntitiesActions.setRelationEntityLoading(fieldName, clearData))
    const query = yield call(getQuery, finalOptions)
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
    const moreEntitiesAvailable = finalOptions.limit ? entities.length > finalOptions.limit : false
    yield put(
      relationEntitiesActions.setRelationEntities(
        fieldName,
        finalOptions.limit ? entities.splice(0, finalOptions.limit) : entities,
        moreEntitiesAvailable,
        finalOptions.searchTerm
      )
    )
  }
}

export function* finalizeOptions(entityName, options) {
  if (options.loadRemoteFieldConfiguration && (!options.constriction || !options.sorting)) {
    const {formName, formBase, constriction, sorting} = options
    const remoteFieldFormName = formName ? `${entityName}_${formName}` : formBase || entityName
    const remoteFieldFormDefinition = yield call(rest.fetchForm, remoteFieldFormName, 'remotefield')
    return {
      ...options,
      constriction: constriction || getConstriction(remoteFieldFormDefinition),
      sorting: sorting || getSorting(remoteFieldFormDefinition) || [{field: 'update_timestamp', order: 'desc'}]
    }
  }
  return options
}

export const getSorting = formDefinition => {
  const table = getTable(formDefinition)
  return table?.sorting || null
}

export const getConstriction = formDefinition => {
  const table = getTable(formDefinition)
  return table?.constriction || null
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
