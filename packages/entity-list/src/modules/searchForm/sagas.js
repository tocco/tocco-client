import {form, rest, notification} from 'tocco-app-extensions'
import React, {useState} from 'react'
import _reduce from 'lodash/reduce'
import {
  actions as formActions,
  getFormValues,
  isDirty
} from 'redux-form'
import * as formActionTypes from 'redux-form/es/actionTypes'
import {call, put, select, takeLatest, take, all} from 'redux-saga/effects'
import {EditableValue, StatedValue} from 'tocco-ui'
import {channel} from 'redux-saga'
import {FormattedMessage} from 'react-intl'

import {StyledButton} from './StyledComponents'
import * as actions from './actions'
import {getFormFieldFlat, getEndpoint, changeParentFieldType} from '../../util/api/forms'
import {setSearchFormType} from '../entityList/actions'
import {validateSearchFields} from '../../util/searchFormValidation'
import {SET_ENTITY_MODEL, SET_FORM_DEFINITION} from '../list/actions'
import {getBasicQuery} from '../list/sagas'
import searchFormTypes from '../../util/searchFormTypes'
import ColumnPicker from '../../components/ColumnPicker'

export const inputSelector = state => state.input
export const searchFormSelector = state => state.searchForm
export const listSelector = state => state.list
export const entityListSelector = state => state.entityList
export const listFromDefinitionSelector = state => state.list.formDefinition
export const searchValuesSelector = getFormValues('searchForm')
export const isDirtySelector = isDirty('searchForm')

const FORM_ID = 'searchForm'

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE, initialize),
    takeLatest(formActionTypes.CHANGE, submitSearchFrom),
    takeLatest(actions.SUBMIT_SEARCH_FORM, submitSearchFrom),
    takeLatest(actions.RESET_SEARCH, resetSearch),
    takeLatest(actions.SAVE_SEARCH_FILTER, saveSearchFilter),
    takeLatest(actions.DELETE_SEARCH_FILTER, deleteSearchFilter),
    takeLatest(actions.SAVE_DEFAULT_SEARCH_FILTER, saveDefaultSearchFilter),
    takeLatest(actions.RESET_DEFAULT_SEARCH_FILTER, resetDefaultSearchFilter),
    takeLatest(actions.DISPLAY_SEARCH_FIELDS_MODAL, displaySearchFieldsModal),
    takeLatest(actions.RESET_SEARCH_FIELDS, resetSearchFields)
  ])
}

export function* initialize() {
  const {searchFormType, entityName} = yield select(entityListSelector)
  const searchFormVisible = searchFormType !== searchFormTypes.NONE

  const formDefinition = searchFormVisible ? yield call(loadSearchForm) : null
  yield call(setInitialFormValues, searchFormVisible, formDefinition)
  if (searchFormType === searchFormTypes.ADMIN) {
    yield call(loadSearchFilter, entityName)
  }

  yield put(actions.setInitialized())
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
  const {preselectedSearchFields} = yield select(inputSelector)
  const {parent} = yield select(entityListSelector)
  let formValues = {}
  if (preselectedSearchFields) {
    const model = yield call(getEntityModel)
    const preselectedValues = searchFormVisible
      ? yield call(form.transformInputValues, preselectedSearchFields, model)
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
  const oldValues = yield select(getFormValues(FORM_ID))

  yield put(formActions.initialize(FORM_ID, transformedFromValues))
  if (oldValues) {
    yield all(Object.keys(oldValues).map(fieldId =>
      put(formActions.change(FORM_ID, fieldId, oldValues[fieldId]))
    ))
  }
  yield put(actions.setValuesInitialized(true))
}

export function* transformFieldNames(formValues) {
  return _reduce(formValues, (acc, val, key) => (
    {...acc, [form.transformFieldName(key)]: val}
  ), {})
}

export function* submitSearchFrom() {
  const values = yield select(getFormValues(FORM_ID))
  const {formDefinition} = yield select(searchFormSelector)
  const errors = yield call(validateSearchFields, values, formDefinition)

  if (Object.keys(errors).length === 0) {
    yield put(actions.executeSearch())
  }
}

export function* loadSearchFilter(entityName) {
  const searchFilters = yield call(rest.fetchSearchFilters, entityName)

  const {parent} = yield select(entityListSelector)
  const listHasNoParent = !parent
  yield put(actions.setSearchFilters(searchFilters.map(searchFilter =>
    ({...searchFilter, ...(listHasNoParent && searchFilter.defaultFilter && {active: true})}))
  ))
}

export function* setSimpleForm() {
  const formDefinition = {txtFulltext: 'fulltext-search'}
  yield put(actions.setFormFieldsFlat(formDefinition))
}

export function* loadSearchForm(forceLoad = false) {
  const {searchFormType, formName} = yield select(entityListSelector)
  if (searchFormType === searchFormTypes.SIMPLE) {
    yield call(setSimpleForm)
    return null
  }

  let formDefinition = yield call(rest.fetchForm, formName, 'search', true, forceLoad)

  if (formDefinition) {
    const {parent} = yield select(inputSelector)
    if (parent && parent.reverseRelationName) {
      formDefinition = yield call(changeParentFieldType, formDefinition, parent.reverseRelationName)
    }

    yield put(actions.setFormDefinition(formDefinition))
    yield put(actions.setFormFieldsFlat(getFormFieldFlat(formDefinition)))
    return formDefinition
  } else {
    yield put(setSearchFormType(searchFormTypes.SIMPLE))
    yield call(setSimpleForm)
    return null
  }
}

export function* getEntityModel() {
  const entityList = yield select(listSelector)
  if (Object.keys(entityList.entityModel).length === 0) {
    yield take(SET_ENTITY_MODEL)
  }

  const {entityModel} = yield select(listSelector)
  return entityModel
}

export function* resetSearchFilters() {
  const {searchFilters} = yield select(searchFormSelector)

  yield put(actions.setSearchFilters(searchFilters.map(searchFilter =>
    ({...searchFilter, active: searchFilter.defaultFilter})
  )))
}

export function* resetSearch() {
  yield call(resetSearchFilters)
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

export function* saveSearchFilter() {
  const answerChannel = yield call(channel)
  yield put(notification.modal(
    'filter-save',
    'client.entity-list.search.settings.saveAsFilter',
    null,
    ({close}) => {
      const onSave = value => {
        close()
        answerChannel.put(value)
      }
      const [name, setName] = useState('')
      return <>
        <StatedValue label={'Name'}>
          <EditableValue type={'string'} value={name} events={{onChange: setName}}/>
        </StatedValue>
        <StyledButton onClick={() => onSave(name)} look={'raised'} ink={'primary'} disabled={!name}>
          <FormattedMessage id="client.entity-list.search.settings.saveAsFilter.button"/>
        </StyledButton>
      </>
    },
    true
  ))

  const searchFilterName = yield take(answerChannel)
  const {where, filter} = yield call(getBasicQuery, false)
  const {sorting} = yield select(listSelector)
  const {entityName} = yield select(entityListSelector)

  const createdSearchFilter = yield call(saveNewSearchFilter, searchFilterName, entityName, where, sorting, filter)
  yield call(loadSearchFilter, entityName)
  yield call(resetSearch)
  yield put(actions.setSearchFilterActive(createdSearchFilter.uniqueId, true, true))
}

export function* saveNewSearchFilter(name, entityName, query, sorting, filters) {
  const order = rest.createSortingString(sorting)
  const resource = 'client/searchfilters'
  const body = {
    name,
    query,
    entityName,
    order,
    filters
  }
  const {body: response} = yield call(rest.requestSaga, resource, {method: 'POST', body})
  return response
}

export function* deleteSearchFilter({payload: {primaryKey}}) {
  const {actionAppComponent: ActionAppComponent, navigationStrategy} = yield select(inputSelector)

  const answerChannel = yield call(channel)
  yield put(notification.modal(
    'filter-delete',
    'client.actions.delete.title',
    null,
    ({close}) => {
      const onSuccess = () => {
        answerChannel.put(true)
        close()
      }

      const onCancel = () => {
        answerChannel.put(false)
        close()
      }

      return <ActionAppComponent
        appId={'delete'}
        selection={{
          entityName: 'Search_filter',
          ids: [primaryKey],
          type: 'ID'
        }}
        navigationStrategy={navigationStrategy}
        onSuccess={onSuccess}
        onCancel={onCancel}/>
    },
    true
  ))

  const isSearchFilterDeleted = yield take(answerChannel)
  if (isSearchFilterDeleted) {
    const {entityName} = yield select(entityListSelector)
    yield call(loadSearchFilter, entityName)
    yield call(resetSearch)
  }
}

export function* saveDefaultSearchFilter() {
  const {searchFilters, formDefinition} = yield select(searchFormSelector)
  const key = `${formDefinition.modelName}.${formDefinition.id}.searchfilter`
  const value = searchFilters.find(s => s.active).key
  yield call(rest.savePreferences, {[key]: value})
  yield put(notification.toaster({
    type: 'success',
    title: 'client.entity-list.search.settings.defaultFilter.save.success'
  }))
}

export function* resetDefaultSearchFilter() {
  const {formDefinition} = yield select(searchFormSelector)
  yield call(rest.deleteUserPreferences, `${formDefinition.modelName}.${formDefinition.id}.searchfilter`)
  yield put(notification.toaster({
    type: 'success',
    title: 'client.entity-list.search.settings.defaultFilter.reset.success'
  }))
}

export function* displaySearchFieldsModal() {
  const {formDefinition} = yield select(searchFormSelector)
  const columns = formDefinition.children.flatMap(f => f.children).map(f => ({
    id: f.id,
    label: f.label,
    hidden: f.hidden === true
  }))
  const columnsSorted = [
    ...columns.filter(f => !f.hidden),
    ...columns.filter(f => f.hidden)
  ]

  const answerChannel = yield call(channel)
  yield put(notification.modal(
    `${formDefinition.id}-search-fields-selection`,
    'client.entity-list.search.settings.searchForm.edit',
    null,
    ({close}) => {
      const onOk = columns => {
        close()
        answerChannel.put(columns)
      }

      return <ColumnPicker initialColumns={columnsSorted} onOk={onOk} dndEnabled={true}/>
    },
    true
  ))

  yield call(saveSearchFields, formDefinition.modelName, answerChannel)
  yield call(loadSearchForm, true)
  yield call(resetSearch)
}

function* saveSearchFields(modelName, answerChannel) {
  const columns = yield take(answerChannel)
  const resource = `forms/${modelName}/search-fields`
  const options = {
    method: 'POST',
    body: {
      hiddenFields: columns.filter(c => c.hidden).map(c => c.id),
      displayedFields: columns.filter(c => !c.hidden).map(c => c.id)
    }
  }

  yield call(rest.requestSaga, resource, options)
}

export function* resetSearchFields() {
  const {formDefinition} = yield select(searchFormSelector)
  const resource = `forms/${formDefinition.modelName}/search-fields/reset`
  const options = {
    method: 'POST'
  }

  yield call(rest.requestSaga, resource, options)
  yield call(loadSearchForm, true)
  yield call(resetSearch)
}
