import {takeLatest, all, select, call, put} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'

export const mergeSelector = state => state.merge

export default function* mainSagas() {
  yield all([
    takeLatest(actions.INITIALIZE, initialize),
    takeLatest(actions.EXECUTE_MERGE, executeMerge)
  ])
}

export function* initialize() {
  const {selection} = yield select(mergeSelector)
  yield call(loadSourceData, selection)
}

export function* loadSourceData(selection) {
  const resource = 'nice2/rest/merge/sourceData'
  const options = {
    method: 'POST',
    body: {
      selection
    }
  }
  const response = yield call(rest.requestSaga, resource, options)
  const {body: sourceData} = response
  yield put(actions.setSourceData(sourceData))
}

export function* executeMerge() {
  const body = {} // TODO: Implement
  const resource = 'nice2/rest/merge/merge'
  const options = {
    method: 'POST',
    body
  }

  const response = yield call(rest.requestSaga, resource, options)

  yield put(actions.setMergeResponse(response))
}
