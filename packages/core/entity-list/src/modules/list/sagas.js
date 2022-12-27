import _isEqual from 'lodash/isEqual'
import _omit from 'lodash/omit'
import _union from 'lodash/union'
import {all, call, delay, fork, put, select, spawn, take, takeEvery, takeLatest} from 'redux-saga/effects'
import {actionEmitter, externalEvents, form, remoteEvents, reports, rest} from 'tocco-app-extensions'
import {api, consoleLogger} from 'tocco-util'

import {entitiesListKeyTransformer, entitiesListTransformer} from '../../util/api/entities'
import {getFetchOptionsFromSearchForm} from '../../util/api/fetchOptions'
import {
  getConstriction,
  getEndpoint,
  getFields,
  getFormDefinition,
  getSearchEndpoint,
  getSorting,
  splitFormId
} from '../../util/api/forms'
import {getActualLimit} from '../../util/preferences'
import * as preferencesActions from '../preferences/actions'
import * as searchFormActions from '../searchForm/actions'
import {getSearchFormValues} from '../searchForm/sagas'
import * as selectionActions from '../selection/actions'
import * as actions from './actions'

export const stateSelector = state => state
export const inputSelector = state => state.input
export const entityListSelector = state => state.entityList
export const listSelector = state => state.list
export const searchFormSelector = state => state.searchForm
export const selectionSelector = state => state.selection
export const preferencesSelector = state => state.preferences
export const reportsSelector = state => state.reports

export default function* sagas() {
  yield all([
    takeLatest(actions.INITIALIZE, initialize),
    takeLatest(actions.CHANGE_PAGE, changePage),
    takeLatest(searchFormActions.EXECUTE_SEARCH, reloadData),
    takeLatest(searchFormActions.EXECUTE_SEARCH, queryChanged),
    takeLatest(actions.SET_SORTING_INTERACTIVE, reloadData),
    takeLatest(actions.REFRESH, refreshData),
    takeLatest(actions.NAVIGATE_TO_CREATE, navigateToCreate),
    takeLatest(actions.NAVIGATE_TO_ACTION, navigateToAction),
    takeLatest(selectionActions.RELOAD_DATA, reloadData),
    takeLatest(actions.ON_ROW_CLICK, onRowClick),
    takeEvery(remoteEvents.REMOTE_EVENT, remoteEvent),
    takeLatest(searchFormActions.SET_SEARCH_FILTER_ACTIVE, setSorting),
    takeLatest(actions.DEFINE_SORTING, setSorting),
    takeLatest(actions.SET_MARKED, setMarked),
    takeLatest(actions.TOGGLE_MARKINGS, toggleMarkings)
  ])
}

export function* initialize() {
  const {entityName, formName, searchListFormName, scope} = yield select(inputSelector)
  yield all([
    call(loadFormDefinition, formName, scope, actions.setFormDefinition),
    call(loadEntityModel, entityName),
    searchListFormName
      ? call(loadFormDefinition, searchListFormName, scope, actions.setSearchListFormDefinition)
      : undefined
  ])

  yield put(actions.setInitialized())
}

export function* queryChanged() {
  const query = yield call(getBasicQuery)
  yield put(selectionActions.setQuery(query))
  yield put(externalEvents.fireExternalEvent('onSearchChange', {query}))
}

export function* loadData(page) {
  yield put(actions.setInProgress(true))
  yield fork(countEntities)
  yield put(actions.clearEntityStore())
  yield call(requestEntities, page)
  yield put(actions.setInProgress(false))
}

export function* getBasicQuery(regardSelection = true) {
  const {showSelectedRecords, selection} = yield select(selectionSelector)
  if (regardSelection && showSelectedRecords) {
    return {
      keys: selection
    }
  }

  const {queryViewVisible} = yield select(searchFormSelector)
  if (queryViewVisible) {
    return yield call(getQueryViewQuery)
  } else {
    return yield call(getSearchViewQuery)
  }
}

function* getQueryViewQuery() {
  const {keys: inputKeys} = yield select(inputSelector)
  const {constriction} = yield select(listSelector)
  const {query, queryError} = yield select(searchFormSelector)

  const hasQueryError = queryError && Object.entries(queryError).length !== 0

  const sortingIndex = query.indexOf('order by')
  const where = sortingIndex >= 0 ? query.substring(0, sortingIndex - 1) : query
  return {
    ...(!hasQueryError && {where}),
    ...(constriction && {constriction}),
    ...(inputKeys ? {keys: inputKeys} : {}),
    hasUserChanges: true
  }
}

export function* getSearchViewQuery() {
  const {formFieldsFlat, searchFilters: searchFormSearchFilter} = yield select(searchFormSelector)
  const {
    searchFilters: inputSearchFilters,
    tql: inputTql,
    keys: inputKeys,
    constriction: inputConstriction
  } = yield select(inputSelector)
  const {constriction} = yield select(listSelector)
  const searchFormValues = yield call(getSearchFormValues)

  const searchFormFetchOptions = yield call(getFetchOptionsFromSearchForm, searchFormValues, formFieldsFlat)

  const relevantSearchFormFetchOptions = _omit(searchFormFetchOptions, ['filters', 'tql'])
  const filter = yield call(getSearchFilter, inputSearchFilters, searchFormFetchOptions.filters, searchFormSearchFilter)
  const where = yield call(getTql, inputTql, searchFormFetchOptions.tql)

  const hasUserChanges =
    Object.keys(relevantSearchFormFetchOptions).length > 0 ||
    !_isEqual(inputSearchFilters || [], filter) ||
    (!!searchFormFetchOptions.tql && searchFormFetchOptions.tql.length > 0)

  return {
    ...relevantSearchFormFetchOptions,
    ...(filter && filter.length > 0 ? {filter} : {}),
    ...(where ? {where} : {}),
    ...(inputConstriction || constriction ? {constriction: inputConstriction || constriction} : {}),
    ...(inputKeys ? {keys: inputKeys} : {}),
    hasUserChanges
  }
}

export function* prepareEndpointUrl(endpoint, searchEndpoint, hasUserChanges) {
  const {parent} = yield select(inputSelector)
  const parentKey = parent ? parent.key : ''
  const selectedEndpoint = hasUserChanges && searchEndpoint ? searchEndpoint : endpoint
  return selectedEndpoint ? selectedEndpoint.replace('{parentKey}', parentKey) : null
}

export function* countEntities() {
  const state = yield select(stateSelector)
  const {entityName} = state.input
  const {showSelectedRecords, selection} = state.selection

  const regardSelection = !showSelectedRecords
  const query = yield call(getBasicQuery, regardSelection)

  const formDefinition = getFormDefinition(state, query)
  const endpoint = getEndpoint(formDefinition)
  const searchEndpoint = getSearchEndpoint(formDefinition)

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

export function* refreshData() {
  const {currentPage} = yield select(listSelector)
  yield call(loadData, currentPage)
}

export function* reloadData() {
  yield put(actions.setCurrentPage(1))
  yield call(loadData, 1)
}

export function* getSearchFilter(inputSearchFilters, searchInputsFilters, adminSearchFormFilters = []) {
  const activeSearchFormFilters =
    adminSearchFormFilters && adminSearchFormFilters.filter(f => f.active).map(f => f.uniqueId)

  return yield call(_union, inputSearchFilters, searchInputsFilters, activeSearchFormFilters)
}

export function* hasActiveSearchFilterOrderBy() {
  const {searchFilters} = yield select(searchFormSelector)
  return searchFilters && searchFilters.some(f => f.active && f.orderBy)
}

export const getTql = (inputTql, searchTql) =>
  [
    ...(inputTql && inputTql.length > 0 ? [`(${inputTql})`] : []),
    ...(searchTql && searchTql.length > 0 ? [`(${searchTql})`] : [])
  ].join(' and ')

export function* loadDisplayExpressions(formName, scope, paths, entities) {
  if (paths && paths.length > 0 && entities.length > 0) {
    const keys = entities.map(e => e.__key)
    const entityName = entities[0].__model
    const result = yield call(rest.fetchDisplayExpressions, formName, scope, keys, paths, entityName)
    yield put(actions.setLazyData('displayExpressions', formName, result))
  }
}

export function* loadRelationDisplays(relationFields, entities) {
  if (relationFields && relationFields.length > 0) {
    const {lazyData} = yield select(listSelector)
    const request = yield call(api.getPathDisplayRequest, entities, relationFields, lazyData)
    const displays = yield call(rest.fetchDisplays, request)
    yield all(
      Object.keys(displays).map(entity => put(actions.setLazyData('defaultDisplays', entity, displays[entity])))
    )
  }
}

export function* loadMarkings(entities) {
  const {formDefinition, entityModel} = yield select(listSelector)
  if (entityModel.markable && formDefinition.markable && entities.length > 0) {
    const selection = {
      type: 'ID',
      entityName: entityModel.name,
      ids: entities.map(e => e.__key)
    }
    const result = yield call(rest.fetchMarkings, selection)
    yield call(setLazyDataMarked, entityModel.name, result)
  }
}

export function* setMarked({payload: {entityName, entityKey, marked}}) {
  try {
    yield all([
      call(setLazyDataMarked, entityName, {
        [entityKey]: marked
      }),
      call(rest.setMarked, entityName, entityKey, marked)
    ])
  } catch (e) {
    consoleLogger.logError('Failed to set marked', e)
    yield call(setLazyDataMarked, entityName, {
      [entityKey]: !marked
    })
  }
}

export function* toggleMarkings({payload: {selection}}) {
  try {
    const oldMarkings = yield call(rest.fetchMarkings, selection)
    const setToMarked = Object.values(oldMarkings).includes(false)
    const newMarkings = yield call(rest.setSelectionMarked, selection, setToMarked)
    yield call(setLazyDataMarked, selection.entityName, newMarkings)
  } catch (e) {
    consoleLogger.logError('Failed to toggle markings', e)
  }
}

export function* setLazyDataMarked(entityName, markings) {
  const {lazyData} = yield select(listSelector)
  const currentEntityMarkings = lazyData.markings && lazyData.markings[entityName] ? lazyData.markings[entityName] : {}
  const newEntityMarkings = {
    ...currentEntityMarkings,
    ...markings
  }
  yield put(actions.setLazyData('markings', entityName, newEntityMarkings))
}

export function* fetchEntitiesAndAddToStore(page) {
  const state = yield select(stateSelector)
  const {entityName, scope} = state.input
  const {columns: columnPreferences} = state.preferences
  const {entityStore, sorting} = state.list
  if (!entityStore[page]) {
    const basicQuery = yield call(getBasicQuery)
    const formDefinition = getFormDefinition(state, basicQuery)

    const {paths, relationFields, displayExpressionFields} = yield call(getFields, formDefinition, columnPreferences)
    const query = {
      ...basicQuery,
      page,
      sorting,
      limit: getActualLimit(state),
      paths
    }

    const endpoint = getEndpoint(formDefinition)
    const searchEndpoint = getSearchEndpoint(formDefinition)
    const {formName} = splitFormId(formDefinition.id)

    const preparedEndpoint = yield call(prepareEndpointUrl, endpoint, searchEndpoint, basicQuery.hasUserChanges)
    const requestOptions = {
      method: endpoint ? 'GET' : 'POST',
      ...(preparedEndpoint ? {endpoint: preparedEndpoint} : {})
    }

    const entities = yield call(rest.fetchEntities, entityName, query, requestOptions, entitiesListTransformer)

    yield put(actions.addEntitiesToStore(page, entities))
    yield spawn(loadRelationDisplays, relationFields, entities)
    yield spawn(loadDisplayExpressions, formName, scope, displayExpressionFields, entities)
    yield spawn(loadMarkings, entities)
  }
}

export function* requestEntities(page) {
  const {entityStore} = yield select(listSelector)

  if (!entityStore[page]) {
    yield call(fetchEntitiesAndAddToStore, page)
  }

  yield call(displayEntity, page)
  yield spawn(delayedPreloadNextPage, page)
}

export function* delayedPreloadNextPage(page) {
  yield delay(2000)
  yield call(preloadNextPage, page)
}

export function* preloadNextPage(currentPage) {
  const state = yield select(stateSelector)
  const actualLimit = getActualLimit(state)
  const list = yield select(listSelector)
  const {entityStore} = list
  let {entityCount} = list
  const nextPage = currentPage + 1

  if (entityCount === null || entityCount === undefined) {
    const setCountAction = yield take(actions.SET_ENTITY_COUNT)
    entityCount = setCountAction.payload.entityCount
  }

  if (currentPage * actualLimit < entityCount && !entityStore[nextPage]) {
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
  const {sorting: inputSorting} = yield select(inputSelector)
  const tableSorting = yield call(getSorting, formDefinition)
  const preferencesSorting = yield call(getPreferencesSorting)
  const activeSearchFilterHasOrderBy = yield call(hasActiveSearchFilterOrderBy)
  if (preferencesSorting && preferencesSorting.length > 0) {
    yield put(actions.setSorting(preferencesSorting))
  } else if (inputSorting && inputSorting.length > 0) {
    yield put(actions.setSorting(inputSorting))
  } else if (tableSorting && tableSorting.length > 0) {
    yield put(actions.setSorting(tableSorting))
  } else if (!activeSearchFilterHasOrderBy && entityModel.paths[FALLBACK_SORTING_FIELD]) {
    yield put(actions.setSorting([{field: FALLBACK_SORTING_FIELD, order: 'desc'}]))
  } else {
    yield put(actions.setSorting([]))
  }
}

export function* loadFormDefinition(formName, scope, actionCreator) {
  const {formDefinition} = yield select(listSelector)
  if (formDefinition?.id !== `${formName}_${scope}`) {
    const {modifyFormDefinition, reportIds, parent} = yield select(inputSelector)
    const fetchedFormDefinition = yield call(rest.fetchForm, formName, scope)
    const modifiedFormDefinition = modifyFormDefinition
      ? yield call(modifyFormDefinition, fetchedFormDefinition, {parent})
      : fetchedFormDefinition
    const constriction = getConstriction(modifiedFormDefinition)
    yield put(actions.setConstriction(constriction))
    const finalFormDefinition = yield call(addReportsToForm, reportIds, modifiedFormDefinition)
    yield put(actionCreator(finalFormDefinition))
  } else {
    const constriction = getConstriction(formDefinition)
    yield put(actions.setConstriction(constriction))
  }
}

function* addReportsToForm(reportIds, formDefinition) {
  if (reportIds?.length > 0) {
    yield put(reports.loadReports(reportIds, formDefinition.modelName, 'list'))
    const {payload} = yield take(reports.SET_REPORTS)
    return yield call(form.addReports, formDefinition, payload.reports)
  } else {
    return formDefinition
  }
}

export function* loadEntityModel(entityName) {
  const model = yield call(rest.fetchModel, entityName)
  yield put(actions.setEntityModel(model))
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
  const {navigationStrategy} = yield select(inputSelector)
  yield call(navigationStrategy.navigateToCreateRelative, payload.relationName)
}

export function* navigateToAction({payload}) {
  const {definition, selection} = payload
  const {navigationStrategy} = yield select(inputSelector)
  yield call(navigationStrategy.navigateToActionRelative, definition, selection)
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

  if (event.type === 'action-trigger-event') {
    yield put(event.payload.func(...event.payload.args))
  }

  if (event.type === 'entity-delete-event') {
    const deletedEntityKeys = event.payload.entities.filter(e => e.entityName === entityModel.name).map(e => e.key)
    yield put(selectionActions.onSelectChange(deletedEntityKeys, false))
  }

  yield put(actionEmitter.emitAction(action))
}

/**
 * Action prepare handler to transform a query selection into an ID selection to pass to the action
 * *if* the list form where the action was called from has a custom endpoint defined.
 *
 * To get the keys for the selection, the custom endpoint is called with query param `_allKeys=true`
 * to return the keys without pagination (and without paths, no matter which paths actually get requested).
 */
export function* customEndpointActionPrepareHandler({selection}) {
  if (selection.type === 'QUERY') {
    const state = yield select(stateSelector)
    const formDefinition = getFormDefinition(state, selection.query)
    const endpoint = getEndpoint(formDefinition)

    if (endpoint) {
      const searchEndpoint = getSearchEndpoint(formDefinition)
      const preparedEndpoint = yield call(prepareEndpointUrl, endpoint, searchEndpoint, selection.query.hasUserChanges)
      const requestOptions = {
        method: 'GET',
        endpoint: preparedEndpoint,
        allKeys: true
      }

      const {entityName} = state.input

      const ids = yield call(
        rest.fetchEntities,
        entityName,
        selection.query,
        requestOptions,
        entitiesListKeyTransformer
      )

      const newSelection = {
        type: 'ID',
        entityName,
        ids
      }

      return {
        selection: newSelection,
        abort: false
      }
    }
  }

  return {
    abort: false
  }
}
