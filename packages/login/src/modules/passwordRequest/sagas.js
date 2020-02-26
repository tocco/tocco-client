import {rest} from 'tocco-app-extensions'
import {put, call, select, takeLatest, all} from 'redux-saga/effects'

import * as actions from './actions'
import {changePage, setUsername} from '../login/actions'
import {setMessage, setPending} from '../loginForm/actions'
import {Pages} from '../../types/Pages'

export const textResourceSelector = state => state.intl.messages

export function* requestPasswordSaga({payload}) {
  yield put(setPending(true))
  yield call(rest.requestSaga, `principals/${payload.username}/password-reset`, {method: 'POST'})
  yield put(setUsername(payload.username))
  const textResourcesState = yield select(textResourceSelector)
  yield put(setMessage(textResourcesState['client.login.from.passwordRequested']))
  yield put(changePage(Pages.LOGIN_FORM))
  yield put(setPending(false))
}

export function* passwordRequestSaga({payload}) {
  if (payload.passwordRequest === true) {
    yield put(changePage(Pages.PASSWORD_REQUEST))
  }
}

export default function* saga() {
  yield all([
    takeLatest(actions.REQUEST_PASSWORD, requestPasswordSaga),
    takeLatest(actions.PASSWORD_REQUEST, passwordRequestSaga)
  ])
}
