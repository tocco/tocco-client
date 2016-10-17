import * as actions from './actions'
import {takeLatest, delay} from 'redux-saga'
import {fork, put, select} from 'redux-saga/effects'

import {setMessage, setPending} from './loginForm/actions'
import {setRequestedCode} from './twoStepLogin/actions'
import {changePage} from './login/actions'
import {Pages} from '../types/Pages'

import {getResponse} from '../dev/loginResponseMocks'

export const textResourceSelector = state => state.intl.messages

function doLoginRequest(data) {
  return fetch(`${__BACKEND_URL__}/nice2/login`, getOptions(data))
}

function doSessionRequest(data) {
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

export function* handlePasswordUpdateResponse(body) {
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

export function* handleSuccessfullLogin() {
  console.log('Successfully, redirect...') // Todo: Call Redirect event
}

function getBody(response) {
  return response.json().then(json => (
    json
  ))
}

export function* loginSaga({payload}) {
  let response
  if (__DEV__) {
    yield delay(1000)
    response = yield doDevRequest(payload)
  } else {
    response = yield doLoginRequest(payload)
  }

  const body = yield getBody(response)

  if (body.success) {
    yield handleSuccessfullLogin()
  } else {
    if (body.TWOSTEPLOGIN) {
      yield handleTwoStepLoginResponse(body)
    } else if (body.RESET_PASSWORD_REQUIRED) {
      yield handlePasswordUpdateResponse(body)
    } else if (body.ONE_TILL_BLOCK) {
      yield handleOneTilLBlockResponse(body)
    } else if (body.LOGIN_BLOCKED) {
      yield handleBlockResponse(body)
    } else {
      yield handleFailedResponse(body)
    }
  }

  yield put(setPending(false))
}

export function* checkSessionSaga() {
  let response
  if (__DEV__) {
    response = yield getResponse({username: 'fail'})
  } else {
    response = yield doSessionRequest()
  }
  const body = yield getBody(response)

  if (body.success) {
    yield handleSuccessfullLogin()
  }
}

export default function* mainSagas() {
  yield [
    fork(takeLatest, actions.LOGIN, loginSaga),
    fork(takeLatest, actions.CHECK_SESSION, checkSessionSaga)
  ]
}

