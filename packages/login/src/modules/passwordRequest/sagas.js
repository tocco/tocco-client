// @flow

import {takeLatest} from 'redux-saga'
import {fork, put, call, select} from 'redux-saga/effects'

import type {GlobalState} from '../reducers'

import * as actions from './actions'
import {changePage, setUsername} from '../login/actions'
import {setMessage, setPending} from '../loginForm/actions'
import {Pages} from '../../types/Pages'

export const textResourceSelector = (state: GlobalState): IntlMessages => state.intl.messages

export function doRequest(username: string): Promise<Response> {
  return fetch(`${__BACKEND_URL__}/nice2/rest/principals/${username}/password-reset`, {
    method: 'POST'
  })
}

export function* requestPasswordSaga({payload}: PayloadAction<actions.RequestPasswordPayload>): Generator<*, *, *> {
  yield put(setPending(true))
  yield call(doRequest, payload.username)
  yield put(setUsername(payload.username))
  const textResourcesState = yield select(textResourceSelector)
  yield put(setMessage(textResourcesState['client.login.from.passwordRequested']))
  yield put(changePage(Pages.LOGIN_FORM))
  yield put(setPending(false))
}

export default function* saga(): Generator<*, *, *> {
  yield [
    fork(takeLatest, actions.REQUEST_PASSWORD, requestPasswordSaga)
  ]
}
