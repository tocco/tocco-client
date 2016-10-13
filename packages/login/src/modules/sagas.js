import * as actions from './actions'
import {takeLatest} from 'redux-saga'
import {fork} from 'redux-saga/effects'
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

export function* loginSaga({payload}) {
  if (__DEV__) {
    console.log('DEV MODE: Would send following request in PROD MODE:', getOptions(payload))
    var response = getResponse(payload)
    return new Promise((resolve, reject) => {
      console.log('DEV MODE: Response -> ', response)
      resolve(response)
    })
  } else {
    doRequest(payload)
  }
}

export default function* mainSagas() {
  yield [
    fork(takeLatest, actions.LOGIN, loginSaga)
  ]
}

