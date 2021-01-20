import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import {rest, externalEvents} from 'tocco-app-extensions'
import _get from 'lodash/get'

import * as actions from './actions'

const twoFactorField = 'relTwo_step_login_status'
const twoFactorActiveState = '1'

export const usernameSelector = state => state.twoFactorConnector.username
export const secretSelector = state => state.twoFactorConnector.secret

export function* requestSecret() {
  const username = yield select(usernameSelector)
  const principalsResponse = yield call(rest.requestSaga, `principals/${username}/two-factor`, {method: 'GET'})
  const {secret, totpUri} = principalsResponse.body
  yield put(actions.setSecret({text: secret, uri: totpUri}))
  yield put(actions.goToSecret())
}

export function* verifyCode({payload: {userCode}}) {
  const username = yield select(usernameSelector)
  const {text: secret} = yield select(secretSelector)

  const codeVerifyResponse = yield call(rest.requestSaga, `principals/${username}/two-factor`,
    {
      method: 'POST',
      body: {
        secret,
        code: userCode
      },
      acceptedStatusCodes: [400]
    })

  yield put(actions.setSetupSuccessful(codeVerifyResponse.status === 204))
  yield put(actions.goToResult())
}

export function* initialize() {
  yield call(loadPrincipal2FAInfo)
  yield put(actions.goToStart())
}

export function* success() {
  yield put(externalEvents.fireExternalEvent('onSuccess'))
}

export function* loadPrincipal2FAInfo() {
  const principalsResponse = yield call(rest.requestSaga, 'principals')
  const username = principalsResponse.body.username
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

export default function* mainSagas() {
  yield all([
    takeLatest(actions.REQUEST_SECRET, requestSecret),
    takeLatest(actions.VERIFY_CODE, verifyCode),
    takeLatest(actions.INITIALIZE, initialize),
    takeLatest(actions.SUCCESS, success)
  ])
}
