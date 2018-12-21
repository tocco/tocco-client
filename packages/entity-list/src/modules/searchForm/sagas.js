import {form, rest} from 'tocco-app-extensions'
import _reduce from 'lodash/reduce'
import {
  actions as formActions,
  getFormValues
} from 'redux-form'
import * as formActionTypes from 'redux-form/es/actionTypes'

import * as actions from './actions'
import {fetchForm, searchFormTransformer} from '../../util/api/forms'
import {getPreselectedValues} from '../../util/searchForm'
import {searchFilterTransformer} from '../../util/api/entities'
import {SET_INITIALIZED as LIST_SET_INITIALIZED} from '../entityList/actions'
import {validateSearchFields} from '../../util/searchFormValidation'

import {call, put, fork, select, takeLatest, take, all} from 'redux-saga/effects'

export const inputSelector = state => state.input
export const searchFormSelector = state => state.searchForm
export const entityListSelector = state => state.entityList
export const searchValuesSelector = getFormValues('searchForm')

const FORM_ID = 'searchForm'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.LOAD_SEARCH_FILTERS, loadSearchFilters),
    fork(takeLatest, formActionTypes.CHANGE, submitSearchFrom),
    fork(takeLatest, actions.SUBMIT_SEARCH_FORM, submitSearchFrom),
    fork(takeLatest, actions.RESET_SEARCH, resetSearch),
    fork(takeLatest, actions.ADVANCED_SEARCH_UPDATE, advancedSearchUpdate)
  ])
}

export function* initialize({payload: {searchFormVisible}}) {
  const {searchFormName, initialized} = yield select(searchFormSelector)
  if (!initialized) {
    const formDefinition = searchFormVisible ? yield call(loadSearchForm, searchFormName) : null
    yield call(setInitialFormValues, searchFormVisible, formDefinition)
    yield put(actions.setInitialized())
  }
}

export function* setInitialFormValues(searchFormVisible, formDefinition) {
  const {preselectedSearchFields, parent} = yield select(inputSelector)
  const {model} = yield call(getEntityModel)

  let formValues = preselectedSearchFields
    ? yield call(getPreselectedValues, preselectedSearchFields, model, null, searchFormVisible)
    : {}

  if (parent && !formValues.hasOwnProperty(parent.reverseRelationName)) {
    formValues[parent.reverseRelationName] = {key: parent.key}
  }

  if (searchFormVisible && formDefinition) {
    const fieldDefinitions = yield call(form.getFieldDefinitions, formDefinition)
    const fromDefaultValues = yield call(form.getDefaultValues, fieldDefinitions)
    formValues = {...fromDefaultValues, ...formValues}
  }

  const transformedFromValues = yield call(transformFieldNames, formValues)

  yield put(formActions.initialize(FORM_ID, transformedFromValues))
  yield put(actions.setValuesInitialized(true))
}

export function* transformFieldNames(formValues) {
  return _reduce(formValues, (acc, val, key) => (
    {...acc, [form.transformFieldName(key)]: val}
  ), {})
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
  if (formDefinition) {
    yield put(actions.setFormDefinition(formDefinition))
  } else {
    yield put(actions.setShowFullTextSearchForm(true))
  }
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

export function* loadSearchFilters({payload}) {
  const {model, group} = payload
  const {searchFilter} = yield select(searchFormSelector)
  if (!searchFilter) {
    const options = {
      conditions: {
        entity: model,
        ...(group ? {'relSearch_filter_group.unique_id': group} : {})
      },
      fields: ['unique_id']
    }

    const searchFilters = yield call(rest.fetchEntities, 'Search_filter', options, searchFilterTransformer)
    yield put(actions.setSearchFilter(searchFilters))
  }

  return searchFilter
}

export function* resetSearch() {
  yield put(formActions.reset('searchForm'))
  yield call(submitSearchFrom)
}

export function* getSearchFormValues() {
  const {valuesInitialized} = yield select(searchFormSelector)

  if (!valuesInitialized) {
    yield take(actions.SET_VALUES_INITIALIZED)
  }

  const searchValues = yield select(searchValuesSelector)

  return _reduce(searchValues, (result, value, key) => (
    {
      ...result,
      ...(!Array.isArray(value) || value.length) ? {[form.transformFieldNameBack(key)]: value} : {}
    }
  ), {})
}

export function* advancedSearchUpdate({payload: {field, ids}}) {
  yield put(formActions.change(FORM_ID, form.transformFieldName(field), ids))
}
