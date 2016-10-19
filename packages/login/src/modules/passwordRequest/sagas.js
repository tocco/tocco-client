import {takeLatest, delay} from 'redux-saga'
import {fork, put, call, select} from 'redux-saga/effects'

import * as actions from './actions'
import {changePage, setUsername} from '../login/actions'
import {setMessage, setPending} from '../loginForm/actions'
import {Pages} from '../../types/Pages'

export const textResourceSelector = state => state.intl.messages

export function doRequest(username) {
  if (__DEV__) {
    console.log('dev mode. would send request to reset password for user:', username)
    return Promise.resolve({'status': 200})
  } else {
    return fetch(`${__BACKEND_URL__}/nice2/rest/principals/${username}/password-reset`, {
      method: 'POST'
    })
  }
}

export function* requestPasswordSaga({payload}) {
  yield put(setPending(true))
  if (__DEV__) {
    yield delay(1000)
  }
  yield call(doRequest, payload.username)
  yield put(setUsername(payload.username))
  const textResourcesState = yield select(textResourceSelector)
  yield put(setMessage(textResourcesState['client.login.from.passwordRequested']))
  yield put(changePage(Pages.LOGIN_FORM))
  yield put(setPending(false))
}

export default function* saga() {
  yield [
    fork(takeLatest, actions.REQUEST_PASSWORD, requestPasswordSaga)
  ]
}

