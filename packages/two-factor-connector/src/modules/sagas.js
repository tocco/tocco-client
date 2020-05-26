import {takeLatest, all, call, put, select} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'
import _get from 'lodash/get'

import * as actions from './actions'

export function* connectLogin() {
  const username = yield select(state => state.twoFactorConnector.username)
  const principalsResponse = yield call(rest.requestSaga, `principals/${username}/two-factor`, {method: 'POST'})
  const {secret, totpUri} = principalsResponse.body
  yield put(actions.setSecret({text: secret, uri: totpUri}))
}

export function* initialize() {
  yield call(load2FAInfo)
}

const twoFactorField = 'relTwo_step_login_status'
const twoFactorActiveState = '1'

export function* load2FAInfo() {
  const principalsResponse = yield call(rest.requestSaga, 'principals')
  const username = principalsResponse.body.username
  yield put(actions.setUserName(username))
  const principals = yield call(rest.fetchEntities, 'Principal',
    {tql: `username == "${username}"`, paths: [twoFactorField]}
  )

  const twoFactorKey = _get(principals, `[0].paths.${twoFactorField}.value.key`)
  const twoFactorActive = twoFactorKey === twoFactorActiveState

  yield put(actions.setTwoFactorActive(twoFactorActive))
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.CONNECT_LOGIN, connectLogin),
    takeLatest(actions.INITIALIZE, initialize)
  ])
}
