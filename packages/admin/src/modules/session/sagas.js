import {consoleLogger} from 'tocco-util'
import {delay} from 'redux-saga'

import * as actions from './actions'

import {takeLatest, fork, call, all, put} from 'redux-saga/effects'

export function* sessionHeartBeat(sessionTimeout) {
  const threeQuarterSeconds = sessionTimeout * 45000
  yield delay(threeQuarterSeconds)
  const sessionResponse = yield call(doSessionRequest)
  yield put(actions.setLoggedIn(sessionResponse.success))
  yield call(sessionHeartBeat, sessionTimeout)
}

export function doRequest(url, options) {
  return fetch(url, options)
    .then(resp => resp.json())
    .catch(e => {
      consoleLogger.logError('Failed to execute request', e)
      return ({success: false})
    })
}

export function* doLogoutRequest() {
  return yield call(doRequest, `${__BACKEND_URL__}/nice2/logout`, getOptions())
}

export function* doSessionRequest() {
  return yield call(doRequest, `${__BACKEND_URL__}/nice2/session`, getOptions())
}

function getOptions(data = {}) {
  return {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }),
    credentials: 'include'
  }
}

export function* loginSuccessful({payload}) {
  const {sessionTimeout} = payload
  yield put(actions.setLoggedIn(true))
  yield call(sessionHeartBeat, sessionTimeout)
}

export function* logout({payload}) {
  yield call(doLogoutRequest)
  yield put(actions.setLoggedIn(false))
}

export function* sessionCheck() {
  const sessionResponse = yield call(doSessionRequest)
  yield put(actions.setLoggedIn(sessionResponse.success))
}

export default function* mainSagas() {
  yield all([
    fork(takeLatest, actions.DO_SESSION_CHECK, sessionCheck),
    fork(takeLatest, actions.LOGIN_SUCCESSFUL, loginSuccessful),
    fork(takeLatest, actions.DO_LOGOUT, logout)
  ])
}
