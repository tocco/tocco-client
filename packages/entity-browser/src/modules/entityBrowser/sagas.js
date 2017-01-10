import {takeLatest} from 'redux-saga'
import {put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'
import * as listViewActions from '../listView/actions'
import * as detailViewActions from '../detailView/actions'
import * as searchFormActions from '../searchForm/actions'

export const entityBrowserSelector = state => state.entityBrowser

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.SHOW_RECORD_DETAIL, showRecordDetail)
  ]
}

export function* initialize() {
  const entityBrowser = yield select(entityBrowserSelector)
  let {entityName, formBase} = entityBrowser

  if (formBase === '') {
    formBase = entityName
    yield put(actions.setFormBase(formBase))
  }

  yield put(listViewActions.initialize(entityName, formBase))
  yield put(searchFormActions.initialize(entityName, formBase))
  yield put(detailViewActions.initialize(entityName, formBase))
}

export function* showRecordDetail({payload}) {
  yield put(detailViewActions.loadRecord(payload.recordId))
}
