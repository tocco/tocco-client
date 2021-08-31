import {cache} from 'tocco-util'
import {rest, login} from 'tocco-app-extensions'
import {takeLatest, call, all, put, select, delay} from 'redux-saga/effects'
import Cookies from 'js-cookie'

import * as actions from './actions'

export const sessionSelector = state => state.session

export function* sessionHeartBeat(sessionTimeout) {
  const threeQuarterSeconds = sessionTimeout * 45000
  yield delay(threeQuarterSeconds)
  const sessionResponse = yield call(login.doSessionRequest)
  yield put(login.setLoggedIn(sessionResponse.success))
  yield call(sessionHeartBeat, sessionTimeout)
}

export function* doLogoutRequest() {
  return yield call(login.doRequest, `${__BACKEND_URL__}/nice2/logout`, login.getOptions())
}

export function* loginSuccessful({payload}) {
  const {sessionTimeout} = payload
  yield put(login.setLoggedIn(true))
  yield call(sessionHeartBeat, sessionTimeout)
}

export function* logout({payload}) {
  yield call(Cookies.remove, 'sso-autologin')
  yield call(doLogoutRequest)
  yield put(login.setLoggedIn(false))
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
    const modules = yield call(rest.requestSaga, 'modules')
    const ssoAvailable = modules.body.modules.includes('nice2.optional.sso')
    cache.addLongTerm('session', 'ssoAvailable', ssoAvailable)
    yield put(actions.setSsoAvailable(ssoAvailable))
  }
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
