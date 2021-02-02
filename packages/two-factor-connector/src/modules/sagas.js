import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import {rest, externalEvents} from 'tocco-app-extensions'
import _get from 'lodash/get'

import * as actions from './actions'

const twoFactorField = 'relTwo_step_login_status'
const twoFactorActiveState = '1'

export const usernameSelector = state => state.twoFactorConnector.username
export const secretSelector = state => state.twoFactorConnector.secret
export const inputSelector = state => state.input

export function* requestSecret() {
  if (!(yield select(secretSelector))) {
    const username = yield select(usernameSelector)
    const principalsResponse = yield call(rest.requestSaga, `principals/${username}/two-factor`, {method: 'GET'})
    const {secret, totpUri} = principalsResponse.body
    yield put(actions.setSecret({secret, uri: totpUri}))
  }
  yield put(actions.goToSecret())
}

function* loginAndActivateTwoFactor(secret, userCode, username, password) {
  const data = {
    secret,
    userCode,
    username,
    password
  }
  const response = yield call(rest.requestSaga, `${__BACKEND_URL__}/nice2/login`,
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      }),
      body: Object.keys(data)
        .filter(k => !!data[k])
        .sort()
        .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&')
    })

  yield put(actions.setSetupSuccessful(response.TWOSTEPLOGIN_ACTIVATION.success))
}

function* activateTwoFactor(username, secret, code) {
  const codeVerifyResponse = yield call(rest.requestSaga, `principals/${username}/two-factor`,
    {
      method: 'POST',
      body: {
        secret,
        code
      },
      acceptedStatusCodes: [400]
    })

  yield put(actions.setSetupSuccessful(codeVerifyResponse.status === 204))
}

export function* verifyCode({payload: {userCode}}) {
  const username = yield select(usernameSelector)
  const {secret} = yield select(secretSelector)
  const {password, forced} = yield select(inputSelector)

  if (forced) {
    yield call(loginAndActivateTwoFactor, secret, userCode, username, password)
  } else {
    yield call(activateTwoFactor, username, secret, userCode)
  }
  yield put(actions.goToResult())
}

export function* initialize() {
  yield call(loadPrincipal2FAInfo)
  const {secret} = yield select(inputSelector)
  if (secret) {
    yield put(actions.setSecret(secret))
  }
  yield put(actions.goToStart())
}

export function* success() {
  yield put(externalEvents.fireExternalEvent('onSuccess'))
}

export function* loadPrincipal2FAInfo() {
  const username = yield call(getUsername)
  yield put(actions.setUserName(username))
  const where = `username === "${username}"`
  const principals = yield call(rest.fetchEntities, 'Principal', {where, paths: [twoFactorField]})

  if (principals.length > 1) {
    throw new Error(`More than one user found for username ${username}`)
  }

  const twoFactorKey = _get(principals, `[0].paths.${twoFactorField}.value.key`)
  const twoFactorActive = twoFactorKey === twoFactorActiveState

  yield put(actions.setTwoFactorActive(twoFactorActive))
}

function* getUsername() {
  const {username: inputUsername} = yield select(inputSelector)
  if (inputUsername) {
    return inputUsername
  } else {
    const principalsResponse = yield call(rest.requestSaga, 'principals')
    return principalsResponse.body.username
  }
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.REQUEST_SECRET, requestSecret),
    takeLatest(actions.VERIFY_CODE, verifyCode),
    takeLatest(actions.INITIALIZE, initialize),
    takeLatest(actions.SUCCESS, success)
  ])
}
