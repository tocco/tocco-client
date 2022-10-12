import _reduce from 'lodash/reduce'
import {actions as formActions, getFormValues, isDirty} from 'redux-form'
import * as formActionTypes from 'redux-form/es/actionTypes'
import {channel} from 'redux-saga'
import {all, call, debounce, put, select, take, takeLatest} from 'redux-saga/effects'
import {form, notification, rest} from 'tocco-app-extensions'
import {ColumnPicker} from 'tocco-ui'
import {tql} from 'tocco-util'

import SearchFilterNameForm from '../../components/SearchFilterNameForm'
import {changeParentFieldType, getEndpoint, getFormFieldFlat} from '../../util/api/forms'
import searchFormTypes from '../../util/searchFormTypes'
import {validateSearchFields} from '../../util/searchFormValidation'
import {setSearchFormType, SET_SEARCH_FORM_TYPE_FROM_INPUT} from '../entityList/actions'
import {SET_ENTITY_MODEL, SET_FORM_DEFINITION, setSorting, refresh} from '../list/actions'
import {getBasicQuery, getSearchViewQuery} from '../list/sagas'
import * as actions from './actions'

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
    takeLatest(SET_SEARCH_FORM_TYPE_FROM_INPUT, initSearchFormType),
    takeLatest(actions.RESET_SEARCH, resetSearch),
    takeLatest(actions.SAVE_SEARCH_FILTER, saveSearchFilter),
    takeLatest(actions.DELETE_SEARCH_FILTER, deleteSearchFilter),
    takeLatest(actions.SAVE_DEFAULT_SEARCH_FILTER, saveDefaultSearchFilter),
    takeLatest(actions.RESET_DEFAULT_SEARCH_FILTER, resetDefaultSearchFilter),
    takeLatest(actions.DISPLAY_SEARCH_FIELDS_MODAL, displaySearchFieldsModal),
    takeLatest(actions.RESET_SEARCH_FIELDS, resetSearchFields),
    takeLatest(actions.LOAD_SEARCH_AS_QUERY, loadSearchAsQuery),
    takeLatest(actions.SAVE_QUERY_AS_FILTER, saveQueryAsFilter),
    takeLatest(actions.RUN_QUERY, runQuery),
    takeLatest(actions.CLEAR_QUERY, refreshData),
    takeLatest(actions.SET_QUERY_VIEW_VISIBLE, refreshData),
    debounce(500, actions.SET_QUERY, checkQuery)
  ])
}

export function* initialize() {
  const {entityName} = yield select(inputSelector)
  const {searchFormType} = yield select(entityListSelector)
  const searchFormVisible = searchFormType !== searchFormTypes.NONE

  const formDefinition = yield call(initSearchFormType)
  yield call(setInitialFormValues, searchFormVisible, formDefinition)
  if (searchFormType === searchFormTypes.ADMIN) {
    yield call(loadSearchFilter, entityName)
  }

  yield put(actions.setInitialized())
}

export function* initSearchFormType() {
  const {searchFormType} = yield select(entityListSelector)
  const searchFormVisible = searchFormType !== searchFormTypes.NONE

  const formDefinition = searchFormVisible ? yield call(loadSearchForm) : null
  return formDefinition
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
    yield all(Object.keys(oldValues).map(fieldId => put(formActions.change(FORM_ID, fieldId, oldValues[fieldId]))))
  }
  yield put(actions.setValuesInitialized(true))
}

export function transformFieldNames(formValues) {
  return _reduce(formValues, (acc, val, key) => ({...acc, [form.transformFieldName(key)]: val}), {})
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

  const {parent} = yield select(inputSelector)
  const listHasNoParent = !parent
  yield put(
    actions.setSearchFilters(
      searchFilters.map(searchFilter => ({
        ...searchFilter,
        ...(listHasNoParent && searchFilter.defaultFilter && {active: true})
      }))
    )
  )
}

export function* setFulltextForm() {
  const formDefinition = {txtFulltext: 'fulltext-search'}
  yield put(actions.setFormFieldsFlat(formDefinition))
}

export function* loadSearchForm(forceLoad = false) {
  const {formName} = yield select(inputSelector)
  const {searchFormType} = yield select(entityListSelector)
  if (searchFormType === searchFormTypes.FULLTEXT) {
    yield call(setFulltextForm)
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
    yield put(setSearchFormType(searchFormTypes.FULLTEXT))
    yield call(setFulltextForm)
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

  yield put(
    actions.setSearchFilters(searchFilters.map(searchFilter => ({...searchFilter, active: searchFilter.defaultFilter})))
  )
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

  return _reduce(
    searchValues,
    (result, value, key) => ({
      ...result,
      ...(!Array.isArray(value) || value.length ? {[form.transformFieldNameBack(key)]: value} : {})
    }),
    {}
  )
}

export function* saveSearchFilter() {
  const searchFilterName = yield call(promptForSearchFilterName)
  const {where, filter} = yield call(getBasicQuery, false)
  const {sorting} = yield select(listSelector)
  const {entityName} = yield select(inputSelector)

  yield call(createNewSearchFilter, searchFilterName, entityName, where, sorting, filter)
}

function* createNewSearchFilter(searchFilterName, entityName, where, sorting, filter) {
  const createdSearchFilter = yield call(saveNewSearchFilter, searchFilterName, entityName, where, sorting, filter)
  yield call(loadSearchFilter, entityName)
  yield call(resetSearch)
  yield put(actions.setSearchFilterActive(createdSearchFilter.uniqueId, true, true))
}

function* promptForSearchFilterName() {
  const answerChannel = yield call(channel)
  yield put(
    notification.modal(
      'filter-save',
      'client.entity-list.search.settings.saveAsFilter',
      null,
      ({close}) => {
        const onSave = value => {
          close()
          answerChannel.put(value)
        }
        return <SearchFilterNameForm onSave={onSave} />
      },
      true
    )
  )
  return yield take(answerChannel)
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
  yield put(
    notification.modal(
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

        return (
          <ActionAppComponent
            appId={'delete'}
            selection={{
              entityName: 'Search_filter',
              ids: [primaryKey],
              type: 'ID'
            }}
            navigationStrategy={navigationStrategy}
            onSuccess={onSuccess}
            onCancel={onCancel}
          />
        )
      },
      true
    )
  )

  const isSearchFilterDeleted = yield take(answerChannel)
  if (isSearchFilterDeleted) {
    const {entityName} = yield select(inputSelector)
    yield call(loadSearchFilter, entityName)
    yield call(resetSearch)
  }
}

export function* saveDefaultSearchFilter() {
  const {searchFilters, formDefinition} = yield select(searchFormSelector)
  const key = `${formDefinition.modelName}.${formDefinition.id}.searchfilter`
  const value = searchFilters.find(s => s.active).key
  yield call(rest.savePreferences, {[key]: value})
  yield put(
    notification.toaster({
      type: 'success',
      title: 'client.entity-list.search.settings.defaultFilter.save.success'
    })
  )
}

export function* resetDefaultSearchFilter() {
  const {formDefinition} = yield select(searchFormSelector)
  yield call(rest.deleteUserPreferences, `${formDefinition.modelName}.${formDefinition.id}.searchfilter`)
  yield put(
    notification.toaster({
      type: 'success',
      title: 'client.entity-list.search.settings.defaultFilter.reset.success'
    })
  )
}

export function* displaySearchFieldsModal() {
  const {formDefinition} = yield select(searchFormSelector)
  const columns = formDefinition.children
    .flatMap(f => f.children)
    .map(f => ({
      id: f.id,
      label: f.label,
      hidden: f.hidden === true
    }))
  const columnsSorted = [...columns.filter(f => !f.hidden), ...columns.filter(f => f.hidden)]

  const answerChannel = yield call(channel)
  yield put(
    notification.modal(
      `${formDefinition.id}-search-fields-selection`,
      'client.entity-list.search.settings.searchForm.edit',
      null,
      ({close}) => {
        const onOk = pickedColumns => {
          close()
          answerChannel.put(pickedColumns)
        }

        return <ColumnPicker initialColumns={columnsSorted} onOk={onOk} dndEnabled={true} />
      },
      true
    )
  )

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

export function* loadSearchAsQuery() {
  const {where: condition, filter: filters} = yield call(getSearchViewQuery)
  const {sorting} = yield select(listSelector)
  const sortingString = sorting.map(({field, order}) => `${field} ${order}`).join(', ')
  const {entityName} = yield select(inputSelector)

  const resource = `client/query/${entityName}/build`
  const options = {
    method: 'POST',
    body: {
      condition,
      filters,
      sorting: sortingString
    }
  }

  const {
    body: {query}
  } = yield call(rest.requestSaga, resource, options)
  yield put(actions.setQuery(query))
  yield call(checkQuery)
}

export function* saveQueryAsFilter() {
  const searchFilterName = yield call(promptForSearchFilterName)
  const {query} = yield select(searchFormSelector)
  const {entityName} = yield select(inputSelector)
  const sorting = tql.getSortingFromQuery(query)
  const sortingIndex = query.indexOf('order by')
  const condition = sortingIndex >= 0 ? query.substring(0, sortingIndex - 1) : query

  yield call(createNewSearchFilter, searchFilterName, entityName, condition, sorting)
  yield put(actions.setQueryViewVisible(false))
}

export function* checkQuery() {
  const {query} = yield select(searchFormSelector)
  const {entityName} = yield select(inputSelector)
  const resource = `client/query/${entityName}/validation`
  const options = {
    method: 'POST',
    body: {
      condition: query
    }
  }

  const {
    body: {valid, message}
  } = yield call(rest.requestSaga, resource, options)
  if (!valid) {
    yield put(actions.setQueryError({error: [message]}))
  } else {
    yield put(actions.setQueryError({}))
  }
}

export function* runQuery() {
  const {query, queryError} = yield select(searchFormSelector)
  if (!queryError || Object.entries(queryError).length === 0) {
    const sortingIndex = query.indexOf('order by')
    if (sortingIndex >= 0) {
      const sorting = tql.getSortingFromQuery(query)
      yield put(setSorting(sorting))
    }
    yield put(actions.executeSearch())
  }
}

export function* refreshData() {
  yield put(refresh())
}
