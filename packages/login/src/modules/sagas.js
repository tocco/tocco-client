import * as actions from './actions'
import {takeLatest} from 'redux-saga'
import {fork} from 'redux-saga/effects'

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
  doRequest(payload)
}

export default function* mainSagas() {
  yield [
    fork(takeLatest, actions.LOGIN, loginSaga)
  ]
}

