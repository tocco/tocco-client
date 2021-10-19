import {cache, consoleLogger} from 'tocco-util'
import {all, call, put, takeLatest} from 'redux-saga/effects'

import notification from '../notification'
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
  const {success, businessUnit, adminAllowed} = yield call(doSessionRequest)
  const cachedPrincipal = cache.getShortTerm('session', 'principal')
  if (cachedPrincipal && cachedPrincipal.currentBusinessUnit.id !== businessUnit) {
    yield call(cache.clearShortTerm)
  }
  yield put(actions.setAdminAllowed(adminAllowed))
  yield put(actions.setLoggedIn(success))
  if (success) {
    yield put(notification.connectSocket())
  }
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.DO_SESSION_CHECK, sessionCheck)
  ])
}
