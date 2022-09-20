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

  const tournamentKey = selectionUtil.getSingleKey(selection, 'Tournament')
  try {
    const leaderboard = yield call(rest.simpleRequest, `bettinggame/${tournamentKey}`)

    yield put(actions.setData(leaderboard.body.data))
  } catch (e) {
    consoleLogger.logError('Failed to fetch data', e)
    yield put(actions.setData(null))
  }
}
