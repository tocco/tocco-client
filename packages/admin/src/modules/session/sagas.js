import {consoleLogger, cache} from 'tocco-util'
import {rest} from 'tocco-app-extensions'
import {takeLatest, call, all, put, select, delay} from 'redux-saga/effects'
import Cookies from 'js-cookie'

import * as actions from './actions'

export const sessionSelector = state => state.session

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

function getOptions() {
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
  yield call(Cookies.remove, 'sso-autologin')
  yield call(doLogoutRequest)
  yield put(actions.setLoggedIn(false))
}

export function* sessionCheck() {
  const sessionResponse = yield call(doSessionRequest)
  yield put(actions.setLoggedIn(sessionResponse.success))
}

export function* loadPrincipal() {
  const cachedPrincipal = cache.get('session', 'principal')
  if (cachedPrincipal !== undefined) {
    yield put(actions.setUsername(cachedPrincipal.username))
    yield put(actions.setCurrentBusinessUnit(cachedPrincipal.currentBusinessUnit))
    return
  }
  const principal = yield call(rest.requestSaga, 'principals')
  const {username, businessUnit: currentBusinessUnit} = principal.body
  yield put(actions.setUsername(username))
  yield put(actions.setCurrentBusinessUnit(currentBusinessUnit))

  yield cache.add('session', 'principal', {
    username,
    currentBusinessUnit
  })
}

export function* loadBusinessUnits() {
  const bUs = yield call(rest.requestSaga, 'principals/businessunits')
  yield put(actions.setBusinessUnits(bUs.body.data))
}

export function* changeBusinessUnitId({payload: {businessUnitId}}) {
  const {username} = yield select(sessionSelector)
  const resource = `principals/${username}/businessunit`
  yield call(rest.requestSaga, resource, {method: 'PUT', body: {businessUnit: businessUnitId}})
  yield call(cache.clear)
  location.reload()
}

export function* checkSsoAvailable() {
  const cachedSsoAvailable = cache.get('session', 'ssoAvailable')
  if (cachedSsoAvailable !== undefined) {
    yield put(actions.setSsoAvailable(cachedSsoAvailable))
  } else {
    const modules = yield call(rest.requestSaga, 'modules')
    const ssoAvailable = modules.body.modules.includes('nice2.optional.sso')
    cache.add('session', 'ssoAvailable', ssoAvailable)
    yield put(actions.setSsoAvailable(ssoAvailable))
  }
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.DO_SESSION_CHECK, sessionCheck),
    takeLatest(actions.LOGIN_SUCCESSFUL, loginSuccessful),
    takeLatest(actions.DO_LOGOUT, logout),
    takeLatest(actions.LOAD_PRINCIPAL, loadPrincipal),
    takeLatest(actions.LOAD_BUSINESS_UNITS, loadBusinessUnits),
    takeLatest(actions.CHANGE_BUSINESS_UNIT, changeBusinessUnitId),
    takeLatest(actions.CHECK_SSO_AVAILABLE, checkSsoAvailable)
  ])
}
