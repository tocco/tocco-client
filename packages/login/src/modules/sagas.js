import * as actions from './actions'
import {takeLatest, delay} from 'redux-saga'
import {fork, put} from 'redux-saga/effects'

import {setMessage, setPending} from './loginForm/actions'
import {changePage} from './login/actions'
import {Pages} from '../types/Pages'

import {getResponse} from '../dev/loginResponseMocks'

function doRequest(data) {
  return new Promise((resolve, reject) => {
    fetch(`${__BACKEND_URL__}/nice2/login`, getOptions(data))
      .then(resp => {
        resolve(resp)
      })
  })
}

function getOptions(data) {
  return {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    }),
    credentials: 'include',
    body: 'username=' + data.username + '&password=' + data.password
  }
}

function doDevRequest(data) {
  console.log('DEV MODE: Would send following request in PROD MODE:', getOptions(data))
  return Promise.resolve(getResponse(data))
}

export function* handleTwoStepLoginResponse(body) {
  yield put(changePage(Pages.PASSWORD_REQUEST)) // TODO: Change to TwoStep
  yield put(setPending(false))
  console.log('REQUESTEDCODE:', body.REQUESTEDCODE)
}

export function* handlePasswordUpdateResponse(body) {
  yield put(changePage(Pages.PASSWORD_UPDATE))
  yield put(setPending(false))
}

export function* handleOneTilLBlockResponse(body) {
  yield put(setMessage('1 last try', true))
  yield put(setPending(false))
}

export function* handleBlockResponse(body) {
  yield put(setMessage('bocked', true))
  yield put(setPending(false))
}

export function* handleFailedResponse(body) {
  yield put(setMessage('FAIL', true))
  yield put(setPending(false))
}

export function* handleSuccessfullyResponse() {
  yield put(setPending(false))
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
    response = yield doRequest(payload)
  }

  const body = yield getBody(response)

  if (body.success) {
    yield handleSuccessfullyResponse()
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
}

export default function* mainSagas() {
  yield [
    fork(takeLatest, actions.LOGIN, loginSaga)
  ]
}

