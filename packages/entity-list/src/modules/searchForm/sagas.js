import {form, rest} from 'tocco-app-extensions'
import _reduce from 'lodash/reduce'
import {
  actions as formActions,
  getFormValues,
  isDirty
} from 'redux-form'
import * as formActionTypes from 'redux-form/es/actionTypes'
import {call, put, fork, select, takeLatest, take, all} from 'redux-saga/effects'

import * as actions from './actions'
import {getFormFieldFlat, getEndpoint, changeParentFieldType} from '../../util/api/forms'
import {SET_INITIALIZED as LIST_SET_INITIALIZED, setSearchFormType} from '../entityList/actions'
import {validateSearchFields} from '../../util/searchFormValidation'
import {SET_FORM_DEFINITION} from '../list/actions'
import searchFormTypes from '../../util/searchFormTypes'

export const inputSelector = state => state.input
export const searchFormSelector = state => state.searchForm
export const entityListSelector = state => state.entityList
export const listFromDefinitionSelector = state => state.list.formDefinition
export const searchValuesSelector = getFormValues('searchForm')
export const isDirtySelector = isDirty('searchForm')

const FORM_ID = 'searchForm'

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, formActionTypes.CHANGE, submitSearchFrom),
    fork(takeLatest, actions.SUBMIT_SEARCH_FORM, submitSearchFrom),
    fork(takeLatest, actions.RESET_SEARCH, resetSearch)
  ])
}

export function* initialize() {
  const {initialized} = yield select(searchFormSelector)
  const {searchFormType, entityName} = yield select(entityListSelector)
  const searchFormVisible = searchFormType !== searchFormTypes.NONE

  if (searchFormType === searchFormTypes.ADMIN) {
    yield call(loadSearchFilter, entityName)
  }

  if (!initialized) {
    const formDefinition = searchFormVisible ? yield call(loadSearchForm) : null
    yield call(setInitialFormValues, searchFormVisible, formDefinition)
    yield put(actions.setInitialized())
  }
}

export function* getListFormDefinition() {
  const formDefinition = yield select(listFromDefinitionSelector)
  if (!formDefinition) {
    const action = yield take(SET_FORM_DEFINITION)
    return action.payload.formDefinition
  }

  return formDefinition
}

export function* setInitialFormValues(searchFormVisible, formDefinition) {
  const {preselectedSearchFields, parent} = yield select(inputSelector)

  let formValues = {}

  if (preselectedSearchFields) {
    const model = yield call(getEntityModel)
    const preselectedValues = searchFormVisible
      ? yield call(form.loadDisplaysOfRelationFields, preselectedSearchFields, model)
      : preselectedSearchFields

    formValues = {...formValues, ...preselectedValues}
  }

  if (parent && !Object.prototype.hasOwnProperty.call(formValues, parent.reverseRelationName)) {
    const listFormDefinition = yield call(getListFormDefinition)
    const endpoint = yield call(getEndpoint, listFormDefinition)
    if (!endpoint) {
      const display = yield call(rest.fetchDisplay, parent.model, parent.key)
      formValues[parent.reverseRelationName] = {key: parent.key, display}
    }
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

export function* loadSearchFilter(entityName) {
  const searchFilters = yield call(rest.fetchSearchFilters, entityName)

  yield put(actions.setSearchFilters(searchFilters.map(searchFilter =>
    ({...searchFilter, ...(searchFilter.defaultFilter && {active: true})}))
  ))
}

export function* loadSearchForm() {
  const {searchFormType, formName} = yield select(entityListSelector)
  if (searchFormType === searchFormTypes.SIMPLE) {
    return null
  }
  let formDefinition = yield call(rest.fetchForm, formName, 'search', true)
  if (formDefinition) {
    const {parent} = yield select(inputSelector)
    if (parent && parent.reverseRelationName) {
      formDefinition = yield call(changeParentFieldType, formDefinition, parent.reverseRelationName)
    }

    yield put(actions.setFormDefinition(formDefinition))
    yield put(actions.setFormFieldsFlat(getFormFieldFlat(formDefinition)))
  } else {
    yield put(setSearchFormType(searchFormTypes.SIMPLE))
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

export function* resetSearchFilters() {
  const {searchFilters} = yield select(searchFormSelector)

  yield put(actions.setSearchFilters(searchFilters.map(searchFilter =>
    ({...searchFilter, active: searchFilter.defaultFilter})
  )))
}

export function* resetSearch() {
  yield call(resetSearchFilters)

  const isDirty = yield select(isDirtySelector)
  if (isDirty) {
    yield put(formActions.reset('searchForm'))
  } else {
    yield call(submitSearchFrom)
  }
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
