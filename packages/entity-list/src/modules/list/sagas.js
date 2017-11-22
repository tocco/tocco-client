import _isEmpty from 'lodash/isEmpty'
import {call, put, fork, select, spawn, takeEvery, takeLatest, all} from 'redux-saga/effects'
import {externalEvents} from 'tocco-util'
import * as actions from './actions'
import * as searchFormActions from '../searchForm/actions'
import {getSearchInputs} from '../searchForm/sagas'
import {fetchForm, tableDefinitionTransformer, getFieldsOfColumnDefinition} from '../../util/api/forms'
import {fetchEntityCount, fetchEntities, entitiesListTransformer, fetchModel} from '../../util/api/entities'
import {combineSelection} from '../../util/selection'

export const inputSelector = state => state.input
export const entityListSelector = state => state.entityList
export const listSelector = state => state.list

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.CHANGE_PAGE, changePage),
    fork(takeLatest, searchFormActions.EXECUTE_SEARCH, resetDataSet),
    fork(takeEvery, actions.SET_SORTING, resetDataSet),
    fork(takeEvery, actions.RESET_DATA_SET, resetDataSet),
    fork(takeLatest, actions.REFRESH, refresh),
    fork(takeLatest, actions.ON_ROW_CLICK, onRowClick),
    fork(takeLatest, actions.ON_SELECT_CHANGE, onSelectChange)
  ])
}

export function* initialize() {
  yield put(actions.setInProgress(true))
  const {entityName} = yield select(entityListSelector)
  const {formBase} = yield select(inputSelector)
  const listView = yield select(listSelector)
  const {columnDefinition, entityModel, initialized} = listView

  if (!initialized) {
    yield all([
      call(loadEntityModel, entityName, entityModel),
      call(loadTableDefinition, columnDefinition, formBase)
    ])
    yield call(resetDataSet)
  } else {
    yield call(refresh)
  }

  yield put(actions.setInProgress(false))
  yield put(actions.setInitialized())
}

export function* refresh() {
  yield put(actions.setInProgress(true))
  const list = yield select(listSelector)
  const {currentPage} = list
  yield put(actions.clearEntityStore())
  yield call(requestEntities, currentPage)
  yield put(actions.setInProgress(false))
}

export function* changePage({payload}) {
  const {page} = payload
  yield put(actions.setInProgress(true))
  yield put(actions.setCurrentPage(page))
  yield call(requestEntities, page)
  yield put(actions.setInProgress(false))
}

export function* fetchEntitiesAndAddToStore(page) {
  const input = yield select(inputSelector)
  const {entityName, formBase} = input
  const list = yield select(listSelector)
  const {entityStore} = list

  if (!entityStore[page]) {
    const {sorting, limit, columnDefinition} = list

    const formName = `${formBase}_list`

    const searchInputs = yield call(getSearchInputs)
    // combine search filters from input and search form
    searchInputs._filter = [...input.searchFilters || [], ...searchInputs._filter || []]

    const fields = getFieldsOfColumnDefinition(columnDefinition)

    const fetchParams = {
      page,
      sorting,
      limit,
      fields,
      searchInputs,
      formName
    }

    const entities = yield call(fetchEntities, entityName, fetchParams, entitiesListTransformer)
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

  if ((list.limit * page) < list.entityCount) {
    yield spawn(fetchEntitiesAndAddToStore, page + 1)
  }
}

export function* displayEntity(page) {
  const list = yield select(listSelector)
  const entities = list.entityStore[page]
  yield put(actions.setEntities(entities))
}

export function* loadTableDefinition(columnDefinition, formBase) {
  if (columnDefinition.length === 0) {
    const {columnDefinition, sorting} = yield call(
      fetchForm, `${formBase}_list`, tableDefinitionTransformer
    )
    yield put(actions.setColumnDefinition(columnDefinition))
    yield put(actions.setSorting(sorting))
  }
}

export function* loadEntityModel(entityName, entityModel) {
  if (_isEmpty(entityModel)) {
    const {model, createPermission} = yield call(fetchModel, entityName)
    yield put(actions.setEntityModel(model))
    yield put(actions.setCreatePermission(createPermission))
  }
}

export function* resetDataSet() {
  yield put(actions.setInProgress(true))
  const input = yield select(inputSelector)
  const {entityName, searchFilters, formBase} = input

  const formName = `${formBase}_list`
  const searchInputs = yield call(getSearchInputs)
  const fetchParams = {
    searchFilters,
    searchInputs,
    formName
  }

  const entityCount = yield call(fetchEntityCount, entityName, fetchParams)
  yield put(actions.setEntityCount(entityCount))
  yield put(actions.clearEntityStore())

  yield call(changePage, {payload: {page: 1}})
  yield put(actions.setInProgress(false))
}

export function* onRowClick({payload}) {
  yield put(externalEvents.fireExternalEvent('onRowClick', {id: payload.id}))
}

export function* navigateToCreate() {
  yield put(externalEvents.fireExternalEvent('onNavigateToCreate'))
}

export function* onSelectChange({payload}) {
  const list = yield select(listSelector)
  const {selection} = payload
  const newSelection = yield call(combineSelection, list.selection, selection)
  yield put(actions.setSelection(newSelection))
  yield put(externalEvents.fireExternalEvent('onSelectChange', newSelection))
}
