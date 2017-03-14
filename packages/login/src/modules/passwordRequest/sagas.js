import {fork, put, call, select, takeLatest} from 'redux-saga/effects'

import * as actions from './actions'
import {changePage, setUsername} from '../login/actions'
import {setMessage, setPending} from '../loginForm/actions'
import {Pages} from '../../types/Pages'

export const textResourceSelector = state => state.intl.messages

export function doRequest(username) {
  return fetch(`${__BACKEND_URL__}/nice2/rest/principals/${username}/password-reset`, {
    method: 'POST'
  })
}

export function* requestPasswordSaga({payload}) {
  yield put(setPending(true))
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

