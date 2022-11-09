import {all, call, put, select, takeEvery} from 'redux-saga/effects'
import {rest, selection as selectionUtil} from 'tocco-app-extensions'
import {consoleLogger} from 'tocco-util'

import * as actions from './actions'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([takeEvery(actions.FETCH_DATA, fetchData)])
}

export function* fetchData() {
  const {selection} = yield select(inputSelector)
  const url = '/bettinggame/tournament/' + selectionUtil.getSingleKey(selection, 'Tournament')
  try {
    const response = yield call(rest.simpleRequest, url)
    let data = null

    if (response) {
      data = response.body.participants
    }
    yield put(actions.setData(data))
  } catch (e) {
    consoleLogger.logError('Failed to fetch data', e)
    yield put(actions.setData(null))
  }
}
