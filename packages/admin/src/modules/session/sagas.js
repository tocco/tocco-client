import {consoleLogger, cache} from 'tocco-util'
import {rest} from 'tocco-app-extensions'
import {delay} from 'redux-saga'
import {takeLatest, fork, call, all, put, select} from 'redux-saga/effects'
import _get from 'lodash/get'

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
  const {username, businessUnit} = principal.body
  yield put(actions.setUsername(username))

  const fetchedBusinessUnit = yield call(rest.fetchEntities, 'Business_unit', {
    conditions: {
      unique_id: {value: businessUnit}
    },
    paths: ['label']
  })

  const currentBusinessUnit = {
    label: _get(fetchedBusinessUnit, '[0].paths.label.value', businessUnit),
    id: businessUnit
  }

  yield put(actions.setCurrentBusinessUnit(currentBusinessUnit))

  yield cache.add('session', 'principal', {
    username,
    currentBusinessUnit
  })
}

const businessUnitsTransformer = result => result.data.map(businessUnit => (
  {
    id: _get(businessUnit, 'paths.unique_id.value'),
    label: _get(businessUnit, 'paths.label.value')
  }
))

export function* loadBusinessUnits() {
  const options = {paths: ['unique_id', 'label']}
  const businessUnits = yield call(rest.fetchEntities, 'Business_unit', options, {}, businessUnitsTransformer)

  yield put(actions.setBusinessUnits(businessUnits))
}

export function* changeBusinessUnitId({payload: {businessUnitId}}) {
  const {username} = yield select(sessionSelector)
  const resource = `principals/${username}/businessunit`
  yield call(rest.requestSaga, resource, {method: 'PUT', body: {businessUnit: businessUnitId}})
  yield call(cache.clear)
  location.reload()
}

export default function* mainSagas() {
  yield all([
    fork(takeLatest, actions.DO_SESSION_CHECK, sessionCheck),
    fork(takeLatest, actions.LOGIN_SUCCESSFUL, loginSuccessful),
    fork(takeLatest, actions.DO_LOGOUT, logout),
    fork(takeLatest, actions.LOAD_PRINCIPAL, loadPrincipal),
    fork(takeLatest, actions.LOAD_BUSINESS_UNITS, loadBusinessUnits),
    fork(takeLatest, actions.CHANGE_BUSINESS_UNIT, changeBusinessUnitId)
  ])
}
