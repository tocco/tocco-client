import _isEmpty from 'lodash/isEmpty'
import _isEqual from 'lodash/isEqual'
import _union from 'lodash/union'
import {externalEvents, rest, remoteEvents, actionEmitter} from 'tocco-app-extensions'
import _omit from 'lodash/omit'
import {call, put, fork, select, spawn, takeEvery, takeLatest, all, take} from 'redux-saga/effects'
import {api} from 'tocco-util'

import {getFetchOptionsFromSearchForm} from '../../util/api/fetchOptions'
import * as actions from './actions'
import * as searchFormActions from '../searchForm/actions'
import * as selectionActions from '../selection/actions'
import * as entityListActions from '../entityList/actions'
import {getSearchFormValues} from '../searchForm/sagas'
import {
  getSorting,
  getSelectable,
  getClickable,
  getEndpoint,
  getSearchEndpoint,
  getConstriction,
  getFields
} from '../../util/api/forms'
import {entitiesListTransformer} from '../../util/api/entities'
import * as preferencesActions from '../preferences/actions'

export const inputSelector = state => state.input
export const entityListSelector = state => state.entityList
export const listSelector = state => state.list
export const searchFormSelector = state => state.searchForm
export const selectionSelector = state => state.selection
export const preferencesSelector = state => state.preferences

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE, initialize),
    takeLatest(actions.CHANGE_PAGE, changePage),
    takeLatest(searchFormActions.EXECUTE_SEARCH, loadData, 1),
    takeLatest(searchFormActions.EXECUTE_SEARCH, queryChanged),
    takeEvery(actions.SET_SORTING, reloadData),
    takeLatest(actions.SET_SORTING_INTERACTIVE, reloadData),
    takeEvery(actions.RESET_DATA_SET, loadData, 1),
    takeLatest(actions.REFRESH, loadData),
    takeLatest(actions.NAVIGATE_TO_CREATE, navigateToCreate),
    takeLatest(actions.NAVIGATE_TO_ACTION, navigateToAction),
    takeLatest(selectionActions.RELOAD_DATA, loadData, 1),
    takeLatest(actions.ON_ROW_CLICK, onRowClick),
    takeLatest(entityListActions.SET_PARENT, setParent),
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
    yield call(setSorting)
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
  const {searchFilters: inputSearchFilters, tql: inputTql} = yield select(inputSelector)

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

  const relevantSearchFormFetchOptions = _omit(searchFormFetchOptions, ['filters', 'tql'])
  const filter = yield call(getSearchFilter, inputSearchFilters, searchFormFetchOptions.filters, searchFormSearchFilter)
  const where = yield call(getTql, inputTql, searchFormFetchOptions.tql)

  const hasUserChanges = Object.keys(relevantSearchFormFetchOptions).length > 0
    || !_isEqual(inputSearchFilters || [], filter)
    || (!!searchFormFetchOptions.tql && searchFormFetchOptions.tql.length > 0)

  return {
    ...relevantSearchFormFetchOptions,
    ...(filter && filter.length > 0 ? {filter} : {}),
    ...(where ? {where} : {}),
    ...(list.constriction && {constriction: list.constriction}),
    hasUserChanges
  }
}

export function* prepareEndpointUrl(endpoint, searchEndpoint, hasUserChanges) {
  const {parent} = yield select(entityListSelector)
  const parentKey = parent ? parent.key : ''
  const selectedEndpoint = hasUserChanges && searchEndpoint ? searchEndpoint : endpoint
  return selectedEndpoint ? selectedEndpoint.replace('{parentKey}', parentKey) : null
}

export function* countEntities() {
  const {entityName} = yield select(inputSelector)
  const {endpoint, searchEndpoint} = yield select(listSelector)
  const {showSelectedRecords, selection} = yield select(selectionSelector)

  const regardSelection = !showSelectedRecords
  const query = yield call(getBasicQuery, regardSelection)
  const preparedEndpoint = yield call(prepareEndpointUrl, endpoint, searchEndpoint, query.hasUserChanges)

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

export function* setParent() {
  yield call(reloadData)
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

export const getTql = (inputTql, searchTql) => [
  ...(inputTql && inputTql.length > 0 ? [`(${inputTql})`] : []),
  ...(searchTql && searchTql.length > 0 ? [`(${searchTql})`] : [])
].join(' and ')

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
  const {columns: columnPreferences} = yield select(preferencesSelector)
  const {entityStore, sorting, limit, formDefinition, endpoint, searchEndpoint} = yield select(listSelector)
  if (!entityStore[page]) {
    const {paths, relationFields, displayExpressionFields} = yield call(getFields, formDefinition, columnPreferences)
    const basicQuery = yield call(getBasicQuery)
    const query = {
      ...basicQuery,
      page,
      sorting,
      limit,
      paths
    }
    const preparedEndpoint = yield call(prepareEndpointUrl, endpoint, searchEndpoint, basicQuery.hasUserChanges)
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

function* getPreferencesSorting() {
  const preferences = yield select(preferencesSelector)
  if (!preferences.sorting) {
    const {payload} = yield take(preferencesActions.SET_SORTING)
    return payload.sorting
  } else {
    return preferences.sorting
  }
}

export const FALLBACK_SORTING_FIELD = 'update_timestamp'
export function* setSorting() {
  const {formDefinition, entityModel} = yield select(listSelector)
  const tableSorting = yield call(getSorting, formDefinition)
  const preferencesSorting = yield call(getPreferencesSorting)
  if (preferencesSorting && preferencesSorting.length > 0) {
    yield put(actions.setSorting(preferencesSorting))
  } else if (tableSorting.length > 0) {
    yield put(actions.setSorting(tableSorting))
  } else if (entityModel.paths[FALLBACK_SORTING_FIELD]) {
    yield put(actions.setSorting([{field: FALLBACK_SORTING_FIELD, order: 'desc'}]))
  }
}

export function* loadFormDefinition(formDefinition, formName) {
  if (formDefinition === null) {
    formDefinition = yield call(rest.fetchForm, formName, 'list')
    yield put(actions.setFormDefinition(formDefinition))
  }

  const selectable = yield call(getSelectable, formDefinition)
  yield put(actions.setFormSelectable(selectable))
  const clickable = yield call(getClickable, formDefinition)
  yield put(actions.setFormClickable(clickable))
  const endpoint = yield call(getEndpoint, formDefinition)
  yield put(actions.setEndpoint(endpoint))
  const searchEndpoint = yield call(getSearchEndpoint, formDefinition)
  yield put(actions.setSearchEndpoint(searchEndpoint))
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

export function* navigateToAction({payload}) {
  const {definition, selection} = payload
  yield put(externalEvents.fireExternalEvent('onNavigateToAction', {definition, selection}))
}

export const containsEntityOfModel = (event, entityName) =>
  !!event.payload.entities.find(entity => entity.entityName === entityName)

export function* remoteEvent(action) {
  const event = action.payload.event
  const {entityModel} = yield select(listSelector)
  if (['entity-create-event', 'entity-delete-event', 'entity-update-event'].includes(event.type)) {
    if (containsEntityOfModel(event, entityModel.name)) {
      yield call(reloadData)
    }
  }

  if (event.type === 'entity-delete-event') {
    const deletedEntityKeys = event.payload.entities.filter(e => e.entityName === entityModel.name).map(e => e.key)
    yield put(selectionActions.onSelectChange(deletedEntityKeys, false))
  }

  yield put(actionEmitter.emitAction(action))
}
