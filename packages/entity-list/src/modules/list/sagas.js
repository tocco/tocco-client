import _isEmpty from 'lodash/isEmpty'
import _join from 'lodash/join'
import _union from 'lodash/union'
import {externalEvents, actions as actionUtil, actionEmitter, notifier, rest} from 'tocco-util'
import uuid from 'uuid/v4'

import * as actions from './actions'
import * as searchFormActions from '../searchForm/actions'
import {getSearchInputs} from '../searchForm/sagas'
import {fetchForm, getSorting, getSelectable, getEndpoint, getFields} from '../../util/api/forms'
import {
  fetchEntityCount,
  fetchEntities,
  entitiesListTransformer,
  fetchModel
} from '../../util/api/entities'
import {combineSelection} from '../../util/selection'
import selectionStyles from '../../util/selectionStyles'

import {call, put, fork, select, spawn, takeEvery, takeLatest, all} from 'redux-saga/effects'

export const inputSelector = state => state.input
export const entityListSelector = state => state.entityList
export const listSelector = state => state.list

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.CHANGE_PAGE, changePage),
    fork(takeLatest, searchFormActions.EXECUTE_SEARCH, loadData, 1),
    fork(takeEvery, actions.SET_SORTING, setSorting),
    fork(takeEvery, actions.RESET_DATA_SET, loadData, 1),
    fork(takeLatest, actions.REFRESH, loadData),
    fork(takeLatest, actions.ON_ROW_CLICK, onRowClick),
    fork(takeLatest, actions.ON_SELECT_CHANGE, onSelectChange),
    fork(takeEvery, actions.NAVIGATE_TO_CREATE, navigateToCreate),
    fork(takeEvery, actions.DELETE_ENTITIES, deleteEntities),
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

export function* getBasicFetchParams() {
  const {formBase, searchFilters: inputSearchFilters} = yield select(inputSelector)
  const formName = `${formBase}_list`

  const searchInputs = yield call(getSearchInputs)
  searchInputs._filter = yield call(getSearchFilter, inputSearchFilters, searchInputs._filter)

  return {
    searchInputs,
    formName
  }
}

export function* prepareEndpointUrl(endpoint) {
  const {parent} = yield select(inputSelector)
  return parent ? endpoint.replace('{parentKey}', parent.key) : endpoint
}

export function* countEntities() {
  const {entityName} = yield select(inputSelector)
  const {endpoint} = yield select(listSelector)
  const fetchParams = yield call(getBasicFetchParams)
  const resource = endpoint ? yield call(prepareEndpointUrl, endpoint) : endpoint

  const entityCount = yield call(fetchEntityCount, entityName, fetchParams, resource)
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
  const filters = yield call(_union, inputSearchFilters, searchInputsFilters)
  return yield call(_join, filters, ',')
}

export function* fetchEntitiesAndAddToStore(page) {
  const {entityName} = yield select(inputSelector)
  const {entityStore, sorting, limit, formDefinition, endpoint} = yield select(listSelector)
  if (!entityStore[page]) {
    const fields = yield call(getFields, formDefinition)
    const basicFetchParams = yield call(getBasicFetchParams)
    const fetchParams = {
      ...basicFetchParams,
      page,
      sorting,
      limit,
      fields
    }

    const resource = endpoint ? yield call(prepareEndpointUrl, endpoint) : endpoint
    const entities = yield call(fetchEntities, entityName, fetchParams, entitiesListTransformer, resource)
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
    yield put(actions.setSelectable(selectable))
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
    yield put(actions.onSelectChange([payload.id], !selected))
  }
  yield put(externalEvents.fireExternalEvent('onRowClick', {id: payload.id}))
}

export function* deleteEntities({payload}) {
  const blockingInfoId = uuid()
  yield put(notifier.blockingInfo(blockingInfoId, 'client.entity-detail.deleteInProgress', null))
  const {entity, ids} = payload
  const deleteRequests = yield all(ids.map(id => call(rest.deleteEntity, entity, id)))

  yield put(notifier.removeBlockingInfo(blockingInfoId))

  if (deleteRequests.every(r => r.status !== 200)) {
    yield put(notifier.info('error', 'client.entity-list.deleteError', null))
  } else {
    if (deleteRequests.every(r => r.status === 200)) {
      yield put(notifier.info('success', 'client.entity-list.deleteSuccessful', null, 'trash'))
    } else {
      yield put(notifier.info('warning', 'client.entity-list.deletePartlySuccessful', null))
    }
    yield call(loadData)
  }
}

export function* navigateToCreate() {
  yield put(externalEvents.fireExternalEvent('onNavigateToCreate'))
}

export function* onSelectChange({payload: {keys, isSelected}}) {
  const {selection: currentSelection} = yield select(listSelector)
  const {selectionStyle} = yield select(inputSelector)

  const newSelection = selectionStyle === selectionStyles.SINGLE
    ? keys : yield call(combineSelection, currentSelection, keys, isSelected)

  yield put(actions.setSelection(newSelection))
  yield put(externalEvents.fireExternalEvent('onSelectChange', newSelection))
}

export function* actionInvoked(action) {
  yield call(loadData)
  yield put(actionEmitter.emitAction(action))
}
