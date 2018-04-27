import {call, put, fork, select, takeLatest, take, all} from 'redux-saga/effects'
import {form} from 'tocco-util'
import * as actions from './actions'
import {fetchForm, searchFormTransformer} from '../../util/api/forms'
import {getPreselectedValues} from '../../util/searchForm'
import {fetchEntities, selectEntitiesTransformer, searchFilterTransformer} from '../../util/api/entities'

import {SET_INITIALIZED as LIST_SET_INITIALIZED} from '../entityList/actions'
import {
  actions as formActions,
  getFormValues
} from 'redux-form'
import * as formActionTypes from 'redux-form/es/actionTypes'

import _forOwn from 'lodash/forOwn'

import {validateSearchFields} from '../../util/searchFormValidation'
import {getSearchInputsForRequest} from '../../util/searchInputs'

export const inputSelector = state => state.input
export const searchFormSelector = state => state.searchForm
export const entityListSelector = state => state.entityList
export const searchValuesSelector = getFormValues('searchForm')

const FORM_ID = 'searchForm'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.LOAD_RELATION_ENTITY, loadRelationEntity),
    fork(takeLatest, actions.LOAD_SEARCH_FILTERS, loadSearchFilters),
    fork(takeLatest, formActionTypes.CHANGE, submitSearchFrom),
    fork(takeLatest, actions.SUBMIT_SEARCH_FORM, submitSearchFrom),
    fork(takeLatest, actions.RESET_SEARCH, resetSearch)
  ])
}

export function* initialize() {
  const {searchFormName, initialized} = yield select(searchFormSelector)
  if (!initialized) {
    const formDefinition = yield call(loadSearchForm, searchFormName)
    yield call(setInitialFormValues, formDefinition)
    yield put(actions.setInitialized())
  }
}

export function* setInitialFormValues(formDefinition) {
  const {preselectedSearchFields} = yield select(inputSelector)
  const entityModel = yield call(getEntityModel)
  const preselectedValues = preselectedSearchFields
    ? yield call(getPreselectedValues, preselectedSearchFields, entityModel.model, loadRelationEntity)
    : {}

  const fieldDefinitions = yield call(form.getFieldDefinitions, formDefinition)
  const fromDefaultValues = yield call(form.getDefaultValues, fieldDefinitions)

  yield put(formActions.initialize(FORM_ID, {...fromDefaultValues, ...preselectedValues}))
  yield put(actions.setValuesInitialized(true))
}

export function* submitSearchFrom() {
  yield put(formActions.startSubmit(FORM_ID))
  const values = yield select(getFormValues(FORM_ID))
  const {formDefinition} = yield select(searchFormSelector)
  const errors = yield call(validateSearchFields, values, formDefinition)
  yield put(formActions.stopSubmit(FORM_ID, errors))

  if (Object.keys(errors).length === 0) {
    yield put(actions.executeSearch())
  }
}

export function* loadSearchForm(searchFormName) {
  const formDefinition = yield call(fetchForm, searchFormName, searchFormTransformer)
  yield put(actions.setFormDefinition(formDefinition))
  return formDefinition
}

export function* getEntityModel() {
  let entityList = yield select(entityListSelector)
  if (!entityList.initialized) {
    yield take(LIST_SET_INITIALIZED)
  }

  entityList = yield select(entityListSelector)

  return entityList.entityModel
}

export function* loadRelationEntity({payload}) {
  const {entityName} = payload
  const {relationEntities} = yield select(searchFormSelector)
  if (!relationEntities[entityName] || !relationEntities[entityName].loaded) {
    const searchInputs = {
      fields: ['pk'],
      limit: 100
    }
    const entities = yield call(fetchEntities, entityName, searchInputs, selectEntitiesTransformer)
    yield put(actions.setRelationEntity(entityName, entities, true))
    yield put(actions.setRelationEntityLoaded(entityName))
    return entities
  }
  return relationEntities[entityName].data
}

export function* loadSearchFilters({payload}) {
  const {model, group} = payload
  const {searchFilter} = yield select(searchFormSelector)
  if (!searchFilter) {
    const params = {
      searchInputs: {
        entity: model,
        ...(group ? {'relSearch_filter_group.unique_id': group} : {})
      },
      fields: ['unique_id']
    }

    const json = yield call(fetchEntities, 'Search_filter', params)
    const entities = yield call(searchFilterTransformer, json)
    yield put(actions.setSearchFilter(entities))
  }

  return searchFilter
}

export function* resetSearch() {
  yield put(formActions.reset('searchForm'))
  yield call(submitSearchFrom)
}

const getFilterArray = v => {
  if (Array.isArray(v)) {
    return v.map(e => e.uniqueId)
  } else {
    return [v.uniqueId]
  }
}

export function* getSearchInputs() {
  const {valuesInitialized} = yield select(searchFormSelector)

  if (!valuesInitialized) {
    yield take(actions.SET_VALUES_INITIALIZED)
  }

  const searchInputs = yield select(searchValuesSelector)
  const {entityModel} = yield select(entityListSelector)

  const searchInputsRenamed = {}
  _forOwn(searchInputs, (value, key) => {
    if (key === 'searchFilter' && value) {
      searchInputsRenamed._filter = getFilterArray(value)
    } else if (key === 'txtFulltext') {
      searchInputsRenamed._search = value
    } else {
      searchInputsRenamed[form.transformFieldNameBack(key)] = value
    }
  })
  return yield call(getSearchInputsForRequest, searchInputsRenamed, entityModel)
}
