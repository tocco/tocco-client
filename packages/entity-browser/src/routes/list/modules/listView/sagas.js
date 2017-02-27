import {call, put, fork, select, spawn, takeEvery, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import * as searchFormActions from '../searchForm/actions'
import {getSearchInputsForRequest} from '../../../../util/searchInputs'
import {fetchForm, columnDefinitionTransformer} from '../../../../util/api/forms'
import {fetchEntityCount, fetchEntities, entitiesListTransformer} from '../../../../util/api/entities'
import _clone from 'lodash/clone'

export const entityBrowserSelector = state => state.entityBrowser
export const listViewSelector = state => state.listView
export const searchFormSelector = state => state.searchForm

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.CHANGE_PAGE, changePage),
    fork(takeLatest, searchFormActions.SEARCH_TERM_CHANGE, resetDataSet),
    fork(takeEvery, actions.SET_ORDER_BY, resetDataSet),
    fork(takeEvery, actions.RESET_DATA_SET, resetDataSet),
    fork(takeLatest, actions.REFRESH, refresh)
  ]
}

export function* refresh() {
  yield put(actions.setInProgress(true))
  const entityBrowser = yield select(listViewSelector)
  const {currentPage} = entityBrowser
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

export function* getSearchInputs() {
  const searchForm = yield select(searchFormSelector)
  const searchInputs = yield call(_clone, searchForm.searchInputs)

  if (searchInputs && searchInputs.txtFulltext) {
    searchInputs._search = searchInputs.txtFulltext
    delete searchInputs.txtFulltext
  }

  const result = yield call(getSearchInputsForRequest, searchInputs, searchForm)
  return result
}

const extractFields = columnDefinition => {
  let fields = []

  columnDefinition.forEach(column => {
    fields = fields.concat(column.value)
  })

  return fields
}

export function* fetchEntitiesAndAddToStore(page) {
  const listView = yield select(listViewSelector)
  const {entityName, orderBy, limit, entityStore, columnDefinition} = listView

  if (!entityStore[page]) {
    const entityBrowser = yield select(entityBrowserSelector)
    const {formBase} = entityBrowser
    const formName = `${formBase}_list`

    const searchInputs = yield call(getSearchInputs)
    const fields = extractFields(columnDefinition)
    const fetchParams = {
      page,
      orderBy,
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
  const entityBrowser = yield select(listViewSelector)
  let {entityStore} = entityBrowser

  if (!entityStore[page]) {
    yield call(fetchEntitiesAndAddToStore, page)
  }

  yield call(displayEntity, page)

  if ((entityBrowser.limit * page) < entityBrowser.entityCount) {
    yield spawn(fetchEntitiesAndAddToStore, page + 1)
  }
}

export function* displayEntity(page) {
  const entityBrowser = yield select(listViewSelector)
  const entities = entityBrowser.entityStore[page]
  yield put(actions.setEntities(entities))
}

export function* initialize({payload}) {
  const {entityName, formBase} = payload
  yield put(actions.setInProgress(true))
  yield put(actions.setEntityName(entityName))

  const columnDefinition = yield call(fetchForm, formBase + '_list', columnDefinitionTransformer)
  yield put(actions.setColumnDefinition(columnDefinition))

  yield call(resetDataSet)
  yield put(actions.setInProgress(false))
}

export function* resetDataSet() {
  yield put(actions.setInProgress(true))
  const entityBrowser = yield select(listViewSelector)
  const {entityName} = entityBrowser
  const searchInputs = yield call(getSearchInputs)
  const entityCount = yield call(fetchEntityCount, entityName, searchInputs)
  yield put(actions.setEntityCount(entityCount))
  yield put(actions.clearEntityStore())

  yield call(changePage, {payload: {page: 1}})
  yield put(actions.setInProgress(false))
}
