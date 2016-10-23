import {takeLatest, delay} from 'redux-saga'
import {fork, put, select, call} from 'redux-saga/effects'
import {ExternalEvents} from 'tocco-util'

import * as actions from './actions'
import {setMessage, setPending} from './loginForm/actions'
import {setRequestedCode} from './twoStepLogin/actions'
import {updateOldPassword} from './passwordUpdate/password/actions'
import {setUsername} from './passwordUpdate/dialog/actions'
import {changePage} from './login/actions'
import {Pages} from '../types/Pages'

import {getResponse} from '../dev/loginResponseMocks'

export const DEFAULT_TIMEOUT = 30

export const textResourceSelector = state => state.intl.messages
export const loginSelector = state => state.login

export function doLoginRequest(data) {
  return fetch(`${__BACKEND_URL__}/nice2/login`, getOptions(data))
}

export function doSessionRequest() {
  return fetch(`${__BACKEND_URL__}/nice2/session`, getOptions({}))
}

function getOptions(data) {
  return {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }),
    credentials: 'include',
    body: Object.keys(data)
      .filter(k => !!data[k])
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`).join('&')
  }
}

function doDevRequest(data) {
  console.log('DEV MODE: Would send following request in PROD MODE:', getOptions(data))
  var response = getResponse(data)
  console.log('DEV MODE: Response -> ', response)
  return Promise.resolve(response)
}

export function* handleTwoStepLoginResponse(body) {
  yield put(setRequestedCode(body.REQUESTEDCODE))
  yield put(changePage(Pages.TWOSTEPLOGIN))
}

export function* handlePasswordUpdateResponse() {
  const login = yield select(loginSelector)
  yield put(updateOldPassword(login.password))
  yield put(setUsername(login.username))
  yield put(changePage(Pages.PASSWORD_UPDATE))
}

export function* handleOneTilLBlockResponse(body) {
  const textResources = yield select(textResourceSelector)
  yield put(setMessage(textResources['client.login.form.lastTry'], true))
}

export function* handleBlockResponse(body) {
  const textResources = yield select(textResourceSelector)
  yield put(setMessage(textResources['client.login.form.blocked'], true))
}

export function* handleFailedResponse(body) {
  const textResources = yield select(textResourceSelector)
  yield put(setMessage(textResources['client.login.form.failed'], true))
}

export function* handleSuccessfulLogin(body) {
  var timeout = DEFAULT_TIMEOUT
  if (body.timeout) {
    timeout = body.timeout
  }
  yield call(ExternalEvents.invokeExternalEvent, 'loginSuccess', {timeout})
}

export function getBody(response) {
  return response.json().then(json => (
    json
  ))
}

export function* loginSaga({payload}) {
  let response
  if (__DEV__) {
    yield delay(1000)
    response = yield call(doDevRequest, payload)
  } else {
    response = yield call(doLoginRequest, payload)
  }

  const body = yield call(getBody, response)

  if (body.success) {
    yield call(handleSuccessfulLogin, body)
  } else {
    yield put(changePage(Pages.LOGIN_FORM)) // in order to display possible error message
    if (body.TWOSTEPLOGIN) {
      yield call(handleTwoStepLoginResponse, body)
    } else if (body.RESET_PASSWORD_REQUIRED) {
      yield call(handlePasswordUpdateResponse, body)
    } else if (body.ONE_TILL_BLOCK) {
      yield call(handleOneTilLBlockResponse, body)
    } else if (body.LOGIN_BLOCKED) {
      yield call(handleBlockResponse, body)
    } else {
      yield call(handleFailedResponse, body)
    }
  }

  yield put(setPending(false))
}

export function* checkSessionSaga() {
  let response
  if (__DEV__) {
    response = yield getResponse({username: 'fail'})
  } else {
    response = yield call(doSessionRequest)
  }
  const body = yield call(getBody, response)

  if (body.success) {
    yield call(handleSuccessfulLogin, body)
  }
}

export default function* mainSagas() {
  yield [
    fork(takeLatest, actions.LOGIN, loginSaga),
    fork(takeLatest, actions.CHECK_SESSION, checkSessionSaga)
  ]
}

