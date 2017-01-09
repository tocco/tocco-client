import {takeLatest} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'
import * as api from '../../util/api'

export const detailViewSelector = state => state.detailView

export default function* sagas() {
  yield [
    fork(takeLatest, actions.INITIALIZE, initialize),
    fork(takeLatest, actions.LOAD_RECORD, loadRecord)
  ]
}

export function* initialize({payload}) {
  const {entityName, formBase} = payload

  yield put(actions.setEntityName(entityName))
  const detailFormDefinition = yield call(api.fetchDetailForm, formBase + '_detail', 'table')
  yield put(actions.setFormDefinition(detailFormDefinition))
}

export function* loadRecord({payload}) {
  const {recordId} = payload
  const listView = yield select(detailViewSelector)
  const {entityName, formDefinition} = listView
  const record = yield call(api.fetchRecord, entityName, recordId, formDefinition)

  yield put(actions.setRecord(record))
}
