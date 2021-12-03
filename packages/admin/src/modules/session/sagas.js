import {login, notification, rest} from 'tocco-app-extensions'
import {all, call, delay, put, select, takeLatest} from 'redux-saga/effects'
import Cookies from 'js-cookie'
import {cache} from 'tocco-util'

import * as actions from './actions'

export const sessionSelector = state => state.session

export function* sessionHeartBeat(sessionTimeout) {
  const threeQuarterSeconds = sessionTimeout * 45000
  yield put(login.setAdminAllowed(undefined))
  const {success, adminAllowed} = yield call(login.doSessionRequest)
  yield put(login.setLoggedIn(success))
  yield put(login.setAdminAllowed(adminAllowed))
  yield call(delayByTimeout, threeQuarterSeconds)
  yield call(sessionHeartBeat, sessionTimeout)
}

/**
 * this is only here because 'yield delay(timeout)' is a pain to be called when testing
 * see https://github.com/jfairbank/redux-saga-test-plan/issues/257
 * @param timeout the time to wait
 */
export function* delayByTimeout(timeout) {
  yield delay(timeout)
}

export function* doLogoutRequest() {
  return yield call(login.doRequest, 'logout', {method: 'POST'})
}

export function* loginSuccessful({payload}) {
  const {sessionTimeout} = payload
  yield put(login.setLoggedIn(true))
  yield put(notification.connectSocket())
  yield call(sessionHeartBeat, sessionTimeout)
}

export function* logout({payload}) {
  yield call(Cookies.remove, 'sso-autologin')
  yield call(doLogoutRequest)
  yield put(login.setLoggedIn(false))
  yield put(notification.closeSocket())
}

export function* loadPrincipal() {
  const {username, currentBusinessUnit} = yield call(rest.fetchPrincipal)
  yield put(actions.setUsername(username))
  yield put(actions.setCurrentBusinessUnit(currentBusinessUnit))
}

export function* loadBusinessUnits() {
  const bUs = yield call(rest.requestSaga, 'principals/businessunits')
  yield put(actions.setBusinessUnits(bUs.body.data))
}

export function* changeBusinessUnitId({payload: {businessUnitId}}) {
  const {username} = yield select(sessionSelector)
  const resource = `principals/${username}/businessunit`
  yield call(rest.requestSaga, resource, {method: 'PUT', body: {businessUnit: businessUnitId}})
  yield call(cache.clearShortTerm)
  location.reload()
}

export function* checkSsoAvailable() {
  const cachedSsoAvailable = cache.getLongTerm('session', 'ssoAvailable')
  if (cachedSsoAvailable !== undefined) {
    yield put(actions.setSsoAvailable(cachedSsoAvailable))
  } else {
    const ssoAvailable = yield call(isSsoAvailable)
    cache.addLongTerm('session', 'ssoAvailable', ssoAvailable)
    yield put(actions.setSsoAvailable(ssoAvailable))
  }
}

export function* isSsoAvailable() {
  const modules = yield call(rest.requestSaga, 'modules')
  const ssoModuleAvailable = modules.body.modules.includes('nice.optional.sso')
  if (!ssoModuleAvailable) {
    return false
  }
  const ssoProviderCount = yield call(rest.fetchEntityCount, 'Openid_provider', {where: 'active == true'})
  return ssoProviderCount > 0
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOGIN_SUCCESSFUL, loginSuccessful),
    takeLatest(actions.DO_LOGOUT, logout),
    takeLatest(actions.LOAD_PRINCIPAL, loadPrincipal),
    takeLatest(actions.LOAD_BUSINESS_UNITS, loadBusinessUnits),
    takeLatest(actions.CHANGE_BUSINESS_UNIT, changeBusinessUnitId),
    takeLatest(actions.CHECK_SSO_AVAILABLE, checkSsoAvailable)
  ])
}
