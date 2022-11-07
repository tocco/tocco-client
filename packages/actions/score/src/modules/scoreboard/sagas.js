import {all, call, put, select, takeLeading} from 'redux-saga/effects'
import {rest, selection as selectionUtil} from 'tocco-app-extensions'
import {consoleLogger} from 'tocco-util'

import * as actions from './actions'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([takeLeading(actions.FETCH_DATA, fetchData)])
}

export function* fetchData() {
  const {selection} = yield select(inputSelector)
  const tournamentKey = selectionUtil.getSingleKey(selection, 'Tournament')
  try {
    const url = `bettinggame/${tournamentKey}`
    const response = yield call(rest.simpleRequest, url)
    yield put(actions.setData(response.body.resultBeans))
  } catch (e) {
    consoleLogger.logError('Failed to fetch data', e)
    yield put(actions.setData(null))
  }
}
