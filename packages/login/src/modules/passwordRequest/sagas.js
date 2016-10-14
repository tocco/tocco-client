import {changePage} from '../login/actions'
import {setUsername, setMessage} from '../loginForm/actions'
import {takeLatest} from 'redux-saga'
import {fork, put} from 'redux-saga/effects'
import {Pages} from '../../types/Pages'
import * as actions from './actions'

function doRequest(username) {
  return new Promise((resolve, reject) => {
    fetch(`${__BACKEND_URL__}/nice2/rest/principals/${username}/password-reset`)
      .then(resp => {
        resolve(resp)
      })
  })
}

export function* requestPwSaga({payload}) {
  console.log('REQUEST AJAJ')
  yield doRequest(payload.username)
  yield put(setUsername(payload.username))
  yield put(setMessage('Passwort wurde angeforder'))
  yield put(changePage(Pages.LOGIN_FORM))
}

export default function* saga() {
  yield [
    fork(takeLatest, actions.REQUEST_PASSWORD, requestPwSaga)
  ]
}

