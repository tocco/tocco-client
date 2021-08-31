import {consoleLogger} from 'tocco-util'
import {takeLatest, call, all, put} from 'redux-saga/effects'

import * as actions from './actions'

export function doRequest(url, options) {
  return fetch(url, options)
    .then(resp => resp.json())
    .catch(e => {
      consoleLogger.logError('Failed to execute request', e)
      return ({success: false})
    })
}

export function* doSessionRequest() {
  return yield call(doRequest, `${__BACKEND_URL__}/nice2/session`, getOptions())
}

export function getOptions() {
  return {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }),
    credentials: 'include'
  }
}

export function* sessionCheck() {
  const sessionResponse = yield call(doSessionRequest)
  yield put(actions.setLoggedIn(sessionResponse.success))
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.DO_SESSION_CHECK, sessionCheck)
  ])
}
