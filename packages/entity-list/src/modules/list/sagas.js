import _isEmpty from 'lodash/isEmpty'
import _union from 'lodash/union'
import {externalEvents, actions as actionUtil, actionEmitter, rest, remoteEvents} from 'tocco-app-extensions'
import _omit from 'lodash/omit'
import {call, put, fork, select, spawn, takeEvery, takeLatest, all, take} from 'redux-saga/effects'
import {api} from 'tocco-util'

import {getFetchOptionsFromSearchForm} from '../../util/api/fetchOptions'
import * as actions from './actions'
import * as searchFormActions from '../searchForm/actions'
import * as selectionActions from '../selection/actions'
import {getSearchFormValues} from '../searchForm/sagas'
import {getSorting, getSelectable, getEndpoint, getConstriction, getFields} from '../../util/api/forms'
import {entitiesListTransformer} from '../../util/api/entities'

export const inputSelector = state => state.input
export const entityListSelector = state => state.entityList
export const listSelector = state => state.list
export const searchFormSelector = state => state.searchForm
export const selectionSelector = state => state.selection

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE, initialize),
    takeLatest(actions.CHANGE_PAGE, changePage),
    takeLatest(searchFormActions.EXECUTE_SEARCH, loadData, 1),
    takeLatest(searchFormActions.EXECUTE_SEARCH, queryChanged),
    takeEvery(actions.SET_SORTING, reloadData),
    takeEvery(actions.RESET_DATA_SET, loadData, 1),
    takeLatest(actions.REFRESH, loadData),
    takeLatest(actions.NAVIGATE_TO_CREATE, navigateToCreate),
    takeLatest(selectionActions.RELOAD_DATA, loadData, 1),
    takeLatest(actions.ON_ROW_CLICK, onRowClick),
    takeEvery(actionUtil.actions.ACTION_INVOKED, actionInvoked),
    takeEvery(remoteEvents.REMOTE_EVENT, remoteEvent)
  ])
}

export function* initialize() {
  yield put(actions.setInProgress(true))
  const {entityName, formName} = yield select(entityListSelector)

  const {formDefinition, entityModel, initialized} = yield select(listSelector)

  if (!initialized) {
    yield all([
      call(loadEntityModel, entityName, entityModel),
      call(loadFormDefinition, formDefinition, formName)
    ])
    yield call(loadData, 1)
  } else {
    yield call(loadData)
  }

  yield call(queryChanged)
  yield put(actions.setInProgress(false))
  yield put(actions.setInitialized())
}

export function* queryChanged() {
  const query = yield call(getBasicQuery)
  yield put(selectionActions.setQuery(query))
}

export function* loadData(page) {
  yield put(actions.setInProgress(true))
  const {initialized: searchFormInitialized} = yield select(searchFormSelector)

  if (!searchFormInitialized) {
    yield take(searchFormActions.SET_INITIALIZED)
  }

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

export function* getBasicQuery(regardSelection = true) {
  const {searchFilters: inputSearchFilters} = yield select(inputSelector)

  const {showSelectedRecords, selection} = yield select(selectionSelector)
  if (regardSelection && showSelectedRecords) {
    return {
      keys: selection
    }
  }

  const {formFieldsFlat, searchFilters: searchFormSearchFilter} = yield select(searchFormSelector)
  const searchFormValues = yield call(getSearchFormValues)
  const list = yield select(listSelector)

  const searchFormFetchOptions = yield call(getFetchOptionsFromSearchForm, searchFormValues, formFieldsFlat)
  const filter = yield call(getSearchFilter, inputSearchFilters, searchFormFetchOptions.filters, searchFormSearchFilter)

  return {
    ..._omit(searchFormFetchOptions, 'filters'),
    ...(filter && filter.length > 0 ? {filter} : {}),
    ...(list.constriction && {constriction: list.constriction})
  }
}

export function* prepareEndpointUrl(endpoint) {
  const {parent} = yield select(inputSelector)
  return parent ? endpoint.replace('{parentKey}', parent.key) : endpoint
}

export function* countEntities() {
  const {entityName} = yield select(inputSelector)
  const {endpoint} = yield select(listSelector)
  const {showSelectedRecords, selection} = yield select(selectionSelector)

  const regardSelection = !showSelectedRecords
  const query = yield call(getBasicQuery, regardSelection)
  const preparedEndpoint = endpoint ? yield call(prepareEndpointUrl, endpoint) : endpoint

  const requestOptions = {
    method: endpoint ? 'GET' : 'POST',
    ...(preparedEndpoint ? {endpoint: preparedEndpoint} : {})
  }
  const entityCount = yield call(rest.fetchEntityCount, entityName, query, requestOptions)

  if (showSelectedRecords) {
    yield put(actions.setEntityCount(selection.length))
  } else {
    yield put(actions.setEntityCount(entityCount))
  }

  yield put(selectionActions.setQueryCount(entityCount))
}

export function* changePage({payload}) {
  const {page} = payload
  yield put(actions.setInProgress(true))
  yield put(actions.setCurrentPage(page))
  yield call(requestEntities, page)
  yield put(actions.setInProgress(false))
}

export function* reloadData() {
  const {initialized} = yield select(listSelector)
  if (initialized) {
    yield call(loadData, 1)
  }
}

export function* getSearchFilter(inputSearchFilters, searchInputsFilters, adminSearchFormFilters = []) {
  const activeSearchFormFilters = adminSearchFormFilters && adminSearchFormFilters
    .filter(f => f.active).map(f => f.uniqueId)

  return yield call(_union, inputSearchFilters, searchInputsFilters, activeSearchFormFilters)
}

export function* loadDisplayExpressions(formName, paths, entities) {
  if (paths && paths.length > 0 && entities.length > 0) {
    const keys = entities.map(e => e.__key)
    const result = yield call(rest.fetchDisplayExpressions, formName, 'list', keys, paths)
    yield put(actions.setLazyData('displayExpressions', formName, result))
  }
}

export function* loadRelationDisplays(relationFields, entities) {
  if (relationFields && relationFields.length > 0) {
    const {lazyData} = yield select(listSelector)
    const request = yield call(api.getPathDisplayRequest, entities, relationFields, lazyData)
    const displays = yield call(rest.fetchDisplays, request)
    yield all(Object.keys(displays).map(entity =>
      put(actions.setLazyData('defaultDisplays', entity, displays[entity]))
    ))
  }
}

export function* fetchEntitiesAndAddToStore(page) {
  const {entityName, formName} = yield select(entityListSelector)
  const {entityStore, sorting, limit, formDefinition, endpoint} = yield select(listSelector)
  if (!entityStore[page]) {
    const {paths, relationFields, displayExpressionFields} = yield call(getFields, formDefinition)
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
    yield spawn(loadRelationDisplays, relationFields, entities)
    yield spawn(loadDisplayExpressions, formName, displayExpressionFields, entities)
  }
}

export function* requestEntities(page) {
  const {entityStore} = yield select(listSelector)

  if (!entityStore[page]) {
    yield call(fetchEntitiesAndAddToStore, page)
  }

  yield call(displayEntity, page)
  yield spawn(preloadNextPage, page)
}

export function* preloadNextPage(currentPage) {
  const list = yield select(listSelector)
  const {entityStore, limit} = list
  let {entityCount} = list
  const nextPage = currentPage + 1

  if (entityCount === null || entityCount === undefined) {
    const setCountAction = yield take(actions.SET_ENTITY_COUNT)
    entityCount = setCountAction.payload.entityCount
  }

  if (currentPage * limit < entityCount && !entityStore[nextPage]) {
    yield call(fetchEntitiesAndAddToStore, nextPage)
  }
}

export function* displayEntity(page) {
  const list = yield select(listSelector)
  const entities = list.entityStore[page]
  yield put(actions.setEntities(entities))
}

export const FALLBACK_SORTING = [{field: 'update_timestamp', order: 'desc'}]
export function* setSorting(formDefinition) {
  const tableSorting = yield call(getSorting, formDefinition)
  const sorting = tableSorting.length > 0 ? tableSorting : FALLBACK_SORTING

  yield put(actions.setSorting(sorting))
}

export function* loadFormDefinition(formDefinition, formName) {
  if (formDefinition === null) {
    formDefinition = yield call(rest.fetchForm, formName, 'list')
    yield put(actions.setFormDefinition(formDefinition))
  }

  yield call(setSorting, formDefinition)
  const selectable = yield call(getSelectable, formDefinition)
  yield put(actions.setFormSelectable(selectable))
  const endpoint = yield call(getEndpoint, formDefinition)
  yield put(actions.setEndpoint(endpoint))
  const constriction = yield call(getConstriction, formDefinition)
  yield put(actions.setConstriction(constriction))
}

export function* loadEntityModel(entityName, entityModel) {
  if (_isEmpty(entityModel)) {
    const model = yield call(rest.fetchModel, entityName)
    yield put(actions.setEntityModel(model))
  }
}

export function* onRowClick({payload}) {
  const {selectOnRowClick} = yield select(inputSelector)
  if (selectOnRowClick === true) {
    const list = yield select(selectionSelector)
    const selected = list.selection.includes(payload.id)
    yield put(selectionActions.onSelectChange([payload.id], !selected))
  }
  yield put(externalEvents.fireExternalEvent('onRowClick', {id: payload.id}))
}

export function* navigateToCreate({payload}) {
  yield put(externalEvents.fireExternalEvent('onNavigateToCreate', payload.relationName))
}

export function* actionInvoked(action) {
  yield call(loadData)
  yield put(actionEmitter.emitAction(action))
}

const remoteEventReloadPredicates = {
  'legacy-create-event': (payload, entityName) => payload.modelNames.includes(entityName),
  'legacy-delete-event': (payload, entityName) => !!payload.keys.find(key => key._entityName === entityName)
}

export function* remoteEvent(action) {
  const event = action.payload.event

  const reloadPredicate = remoteEventReloadPredicates[event.type]

  if (reloadPredicate) {
    const {entityModel} = yield select(listSelector)
    if (reloadPredicate(event.payload, entityModel.name)) {
      yield call(reloadData)
    }
  }
}
