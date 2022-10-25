import {all, call, put, select, takeLatest} from 'redux-saga/effects'
import {login} from 'tocco-app-extensions'

import * as actions from './actions'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([takeLatest(actions.LOAD_USER, loadUser), takeLatest(actions.LOGOUT, logout)])
}

export function* loadUser() {
  const {username} = yield call(login.doRequest, 'username')
  if (username === 'anonymous') {
    yield put(actions.setLoggedIn(false))
  } else {
    yield put(actions.setLoggedIn(true))
    yield put(actions.setUsername(username))
  }
}

export function* logout() {
  yield call(login.doRequest, 'logout', {method: 'POST'})

  const {logoutRedirectUrl} = yield select(inputSelector)
  if (logoutRedirectUrl) {
    window.location.href = logoutRedirectUrl
  } else {
    window.location.href = '/'
  }
}
