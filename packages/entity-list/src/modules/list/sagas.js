import _isEmpty from 'lodash/isEmpty'
import _union from 'lodash/union'
import {externalEvents, actions as actionUtil, actionEmitter, rest} from 'tocco-app-extensions'
import _omit from 'lodash/omit'

import {getFetchOptionsFromSearchForm} from '../../util/api/fetchOptions'
import * as actions from './actions'
import * as searchFormActions from '../searchForm/actions'
import * as selectionActions from '../selection/actions'
import {getSearchFormValues} from '../searchForm/sagas'
import {fetchForm, getSorting, getSelectable, getEndpoint, getFields} from '../../util/api/forms'
import {entitiesListTransformer, fetchModel} from '../../util/api/entities'

import {call, put, fork, select, spawn, takeEvery, takeLatest, all} from 'redux-saga/effects'

export const inputSelector = state => state.input
export const entityListSelector = state => state.entityList
export const listSelector = state => state.list
export const searchFormSelector = state => state.searchForm
export const selectionSelector = state => state.selection

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.CHANGE_PAGE, changePage),
    fork(takeLatest, searchFormActions.EXECUTE_SEARCH, loadData, 1),
    fork(takeEvery, actions.SET_SORTING, setSorting),
    fork(takeEvery, actions.RESET_DATA_SET, loadData, 1),
    fork(takeLatest, actions.REFRESH, loadData),
    fork(takeLatest, selectionActions.RELOAD_DATA, loadData, 1),
    fork(takeLatest, actions.ON_ROW_CLICK, onRowClick),
    fork(takeEvery, actionUtil.actions.ACTION_INVOKED, actionInvoked)
  ])
}

export function* initialize() {
  yield put(actions.setInProgress(true))
  const {entityName} = yield select(entityListSelector)
  const {formBase} = yield select(inputSelector)
  const listView = yield select(listSelector)
  const {formDefinition, entityModel, initialized} = listView

  if (!initialized) {
    yield all([
      call(loadEntityModel, entityName, entityModel),
      call(loadFormDefinition, formDefinition, formBase)
    ])
    yield call(loadData, 1)
  } else {
    yield call(loadData)
  }

  yield put(actions.setInProgress(false))
  yield put(actions.setInitialized())
}

export function* loadData(page) {
  yield put(actions.setInProgress(true))
  yield fork(countEntities)
  yield put(actions.clearEntityStore())

  if (page) {
    yield put(actions.setCurrentPage(page))
  } else {
    const {currentPage} = yield select(listSelector)
    page = currentPage
  }

  yield call(requestEntities, page)
  yield put(actions.setInProgress(false))
}

export function* getBasicQuery() {
  const {showSelectedRecords, selection} = yield select(selectionSelector)
  if (showSelectedRecords) {
    return {tql: `IN(pk,${selection.join(',')})`}
  }

  const {formBase, searchFilters: inputSearchFilters} = yield select(inputSelector)
  const {formFieldsFlat} = yield select(searchFormSelector)

  const form = `${formBase}_list`

  const searchFormValues = yield call(getSearchFormValues)
  const searchFormFetchOptions = yield call(getFetchOptionsFromSearchForm, searchFormValues, formFieldsFlat)

  const filters = yield call(getSearchFilter, inputSearchFilters, searchFormFetchOptions.filters)
  return {
    ..._omit(searchFormFetchOptions, 'filters'),
    filters,
    form
  }
}

export function* prepareEndpointUrl(endpoint) {
  const {parent} = yield select(inputSelector)
  return parent ? endpoint.replace('{parentKey}', parent.key) : endpoint
}

export function* countEntities() {
  const {entityName} = yield select(inputSelector)
  const {endpoint} = yield select(listSelector)
  const query = yield call(getBasicQuery)

  const preparedEndpoint = endpoint ? yield call(prepareEndpointUrl, endpoint) : endpoint

  const requestOptions = {
    method: endpoint ? 'GET' : 'POST',
    ...(preparedEndpoint ? {endpoint: preparedEndpoint} : {})
  }
  const entityCount = yield call(rest.fetchEntityCount, entityName, query, requestOptions)
  yield put(actions.setEntityCount(entityCount))
}

export function* changePage({payload}) {
  const {page} = payload
  yield put(actions.setInProgress(true))
  yield put(actions.setCurrentPage(page))
  yield call(requestEntities, page)
  yield put(actions.setInProgress(false))
}

export function* setSorting() {
  const {initialized} = yield select(listSelector)
  if (initialized) {
    yield call(loadData, 1)
  }
}

export function* getSearchFilter(inputSearchFilters, searchInputsFilters) {
  return yield call(_union, inputSearchFilters, searchInputsFilters)
}

export function* fetchEntitiesAndAddToStore(page) {
  const {entityName} = yield select(inputSelector)
  const {entityStore, sorting, limit, formDefinition, endpoint} = yield select(listSelector)
  if (!entityStore[page]) {
    const paths = yield call(getFields, formDefinition)
    const basicQuery = yield call(getBasicQuery)

    const query = {
      ...basicQuery,
      page,
      sorting,
      limit,
      paths
    }
    const preparedEndpoint = endpoint ? yield call(prepareEndpointUrl, endpoint) : endpoint
    const requestOptions = {
      method: endpoint ? 'GET' : 'POST',
      ...(preparedEndpoint ? {endpoint: preparedEndpoint} : {})
    }

    const entities = yield call(rest.fetchEntities, entityName, query, requestOptions, entitiesListTransformer)
    yield put(actions.addEntitiesToStore(page, entities))
  }
}

export function* requestEntities(page) {
  const list = yield select(listSelector)
  const {entityStore} = list

  if (!entityStore[page]) {
    yield call(fetchEntitiesAndAddToStore, page)
  }

  yield call(displayEntity, page)
  yield spawn(fetchEntitiesAndAddToStore, page + 1)
}

export function* displayEntity(page) {
  const list = yield select(listSelector)
  const entities = list.entityStore[page]
  yield put(actions.setEntities(entities))
}

export function* loadFormDefinition(formDefinition, formBase) {
  if (formDefinition === null) {
    const formDefinition = yield call(fetchForm, `${formBase}_list`)
    yield put(actions.setFormDefinition(formDefinition))
    const sorting = yield call(getSorting, formDefinition)
    yield put(actions.setSorting(sorting))
    const selectable = yield call(getSelectable, formDefinition)
    yield put(actions.setFormSelectable(selectable))
    const endpoint = yield call(getEndpoint, formDefinition)
    yield put(actions.setEndpoint(endpoint))
  }
}

export function* loadEntityModel(entityName, entityModel) {
  if (_isEmpty(entityModel)) {
    const {model, createPermission} = yield call(fetchModel, entityName)
    yield put(actions.setEntityModel(model))
    yield put(actions.setCreatePermission(createPermission))
  }
}

export function* onRowClick({payload}) {
  const {selectOnRowClick} = yield select(inputSelector)
  if (selectOnRowClick === true) {
    const list = yield select(listSelector)
    const selected = list.selection.includes(payload.id)
    yield put(selectionActions.onSelectChange([payload.id], !selected))
  }
  yield put(externalEvents.fireExternalEvent('onRowClick', {id: payload.id}))
}

export function* navigateToCreate() {
  yield put(externalEvents.fireExternalEvent('onNavigateToCreate'))
}

export function* actionInvoked(action) {
  yield call(loadData)
  yield put(actionEmitter.emitAction(action))
}
