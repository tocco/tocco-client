import {takeLatest} from 'redux-saga'
import {fork, put, call} from 'redux-saga/effects'

import * as actions from './actions'
import {changePage, setUsername} from '../login/actions'
import {setMessage} from '../loginForm/actions'
import {Pages} from '../../types/Pages'

export function doRequest(username) {
  if (__DEV__) {
    console.log('dev mode. would send request to reset password for user:', username)
    return Promise.resolve({"status": 200})
  } else {
    return fetch(`${__BACKEND_URL__}/nice2/rest/principals/${username}/password-reset`, {
      method: 'POST'
    })
  }
}

export function* requestPasswordSaga({payload}) {
  yield call(doRequest, payload.username)
  yield put(setUsername(payload.username))
  yield put(setMessage('Passwort wurde angefordert'))
  yield put(changePage(Pages.LOGIN_FORM))
}

export default function* saga() {
  yield [
    fork(takeLatest, actions.REQUEST_PASSWORD, requestPasswordSaga)
  ]
}

