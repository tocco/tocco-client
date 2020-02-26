import {consoleLogger, cache} from 'tocco-util'
import {externalEvents} from 'tocco-app-extensions'
import {takeLatest, put, select, call, all} from 'redux-saga/effects'

import * as actions from './actions'
import {setMessage, setPending} from './loginForm/actions'
import {setRequestedCode} from './twoStepLogin/actions'
import {updateOldPassword} from './passwordUpdate/password/actions'
import {setUsername} from './passwordUpdate/dialog/actions'
import {changePage, setPassword} from './login/actions'
import {Pages} from '../types/Pages'

export const DEFAULT_TIMEOUT = 30

export const textResourceSelector = (state, key) => state.intl.messages[key] || key
export const loginSelector = state => state.login

export function doRequest(url, options) {
  return new Promise(resolve => {
    fetch(url, options)
      .then(resp => resp.json().then(json => resolve(json)))
      .catch(e => {
        consoleLogger.logError('Failed to execute request', e)
        resolve({success: false})
      })
  })
}

export function* doLoginRequest(data) {
  return yield call(doRequest, `${__BACKEND_URL__}/nice2/login`, getOptions(data))
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
    credentials: 'include',
    body: Object.keys(data)
      .filter(k => !!data[k])
      .sort()
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&')
  }
}

export function* handleTwoStepLoginResponse(response) {
  yield put(setRequestedCode(response.REQUESTEDCODE))
  yield put(changePage(Pages.TWOSTEPLOGIN))
}

export function* handlePasswordUpdateResponse() {
  const login = yield select(loginSelector)
  yield put(updateOldPassword(login.password))
  yield put(setUsername(login.username))
  yield put(changePage(Pages.PASSWORD_UPDATE))
}

export function* handleOneTilLBlockResponse() {
  const text = yield select(textResourceSelector, 'client.login.form.lastTry')
  yield put(setMessage(text, true))
}

export function* handleBlockResponse() {
  const text = yield select(textResourceSelector, 'client.login.form.blocked')
  yield put(setMessage(text, true))
}

export function* handleFailedResponse() {
  const text = yield select(textResourceSelector, 'client.login.form.failed')
  yield put(setMessage(text, true))
}

export function* handleSuccessfulLogin(response) {
  const timeout = response.timeout || DEFAULT_TIMEOUT
  yield put(externalEvents.fireExternalEvent('loginSuccess', {timeout}))
  yield call(cache.clear)
  yield put(setPassword(''))
}

export function* loginSaga({payload}) {
  yield put(setPending(true))
  const response = yield call(doLoginRequest, payload)
  if (response.success) {
    yield call(handleSuccessfulLogin, response)
  } else {
    yield put(changePage(Pages.LOGIN_FORM)) // in order to display possible error message
    if (response.TWOSTEPLOGIN) {
      yield call(handleTwoStepLoginResponse, response)
    } else if (response.RESET_PASSWORD_REQUIRED) {
      yield call(handlePasswordUpdateResponse)
    } else if (response.ONE_TILL_BLOCK) {
      yield call(handleOneTilLBlockResponse)
    } else if (response.LOGIN_BLOCKED) {
      yield call(handleBlockResponse)
    } else {
      yield call(handleFailedResponse)
    }
    yield put(setPending(false))
  }
}

export function* checkSessionSaga() {
  const response = yield call(doSessionRequest)

  if (response.success) {
    yield call(handleSuccessfulLogin, response)
  }
}

export default function* mainSagas() {
  yield all([
    takeLatest(actions.LOGIN, loginSaga),
    takeLatest(actions.CHECK_SESSION, checkSessionSaga)
  ])
}
