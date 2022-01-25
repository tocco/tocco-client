import {all, call, put, select, takeLatest} from 'redux-saga/effects'
import {externalEvents, rest, selection as selectionUtil} from 'tocco-app-extensions'

import * as actions from './actions'

export const inputSelector = state => state.input

export default function* sagas() {
  yield all([
    takeLatest(actions.CHECK_ACCESS_RIGHTS, checkAccessRights),
    takeLatest(actions.CONNECT_PRINCIPAL, connectPrincipal)
  ])
}

export function* checkAccessRights() {
  const {selection} = yield select(inputSelector)
  const key = selectionUtil.getSingleKey(selection, 'Principal')
  const resource = `/sso/action/connectPrincipal/checkAccessRights/${key}`
  const options = {
    method: 'GET',
    acceptedStatusCodes: [403]
  }

  const response = yield call(rest.requestSaga, resource, options)

  if (response.status === 204) {
    yield put(actions.setShowSsoLoginApp(true))
  } else {
    yield put(externalEvents.fireExternalEvent('onError', {
      message: 'client.actions.ConnectPrincipalAction.permission_message'
    }))
  }
}

export function* connectPrincipal({payload: {provider, ssoSubject}}) {
  const {selection} = yield select(inputSelector)
  const resource = '/sso/action/connectPrincipal'
  const options = {
    method: 'POST',
    body: {
      principalKey: selectionUtil.getSingleKey(selection, 'Principal'),
      provider,
      ssoSubject
    }
  }

  const response = yield call(rest.requestSaga, resource, options)

  const type = response.body.success ? 'onSuccess' : 'onError'
  yield put(externalEvents.fireExternalEvent(type, {
    message: response.body.message
  }))
}
