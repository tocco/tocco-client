import {put, fork, select, call, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import * as listViewActions from '../listView/actions'
import * as detailViewActions from '../detailView/actions'
import * as searchFormActions from '../searchForm/actions'
import {fetchModel} from '../../util/api/entities'

export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.SHOW_ENTITY_DETAIL, showEntityDetail)
  ]
}

export function* initialize() {
  const entityBrowser = yield select(entityBrowserSelector)
  let {entityName, formBase, showSearchForm, disableSimpleSearch, simpleSearchFields} = entityBrowser

  const entityModel = yield call(fetchModel, entityName)
  yield put(actions.setEntityModel(entityModel))

  if (formBase === '') {
    formBase = entityName
    yield put(actions.setFormBase(formBase))
  }

  if (showSearchForm) {
    yield put(searchFormActions.initialize(entityName, formBase, disableSimpleSearch, simpleSearchFields))
  }
  yield put(listViewActions.initialize(entityName, formBase))
  yield put(detailViewActions.initialize(entityName, formBase))
}

export function* showEntityDetail({payload}) {
  const entityId = payload.entityId
  if (entityId) {
    yield put(detailViewActions.loadEntity(entityId))
  }
}
