import {externalEvents} from 'tocco-util'
import {takeLatest} from 'redux-saga'
import {call, fork, select, put, all} from 'redux-saga/effects'

import * as actions from './actions'
import localValidate from './validate'
import {isEmptyObject, validationMessagesToErrorMap} from './utils'
import {loginSaga} from '../../sagas'
import {setPassword} from '../../login/actions'

export const validationRulesSelector = state => state.passwordUpdate.validationRules
export const inputSelector = state => state.input
export const usernameSelector = state => state.passwordUpdate.dialog.username
export const passwordSelector = state => state.passwordUpdate.password
export const standaloneSelector = state => state.passwordUpdate.dialog.standalone

function doRequest(data, username, action) {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: 'include'
  }
  return fetch(`${__BACKEND_URL__}/nice2/rest/principals/${username}/${action}`, options)
}

export function storePassword(username, data) {
  return doRequest(data, username, 'password-update')
    .then(resp => {
      if (resp.ok) {
        return {
          error: null
        }
      } else {
        return resp.json().then(json => ({
          error: json
        }))
      }
    })
}

export function remoteValidate(username, data) {
  return doRequest(data, username, 'password-validation')
    .then(resp => {
      if (resp.ok) {
        return resp.json().then(json => json)
      } else {
        // validation request failed for some reason. we ignore that.
        // (validation takes place on actual update request again)
        return resp.json().then(() => ({
          valid: true
        }))
      }
    })
}

export function* updateNewPassword(action) {
  yield put(actions.setNewPassword(action.payload.newPassword))
  yield put(actions.validate())
}

export function* validate() {
  const validationRules = yield select(validationRulesSelector)
  const password = yield select(passwordSelector)

  const errors = localValidate(password.newPassword, password.oldPassword, validationRules)

  if (!isEmptyObject(errors)) {
    yield put(actions.setNewPasswordValidationErrors(errors))
  } else {
    const username = yield select(usernameSelector)
    const data = yield call(getData)
    const result = yield call(remoteValidate, username, data)
    if (result.valid === true) {
      yield put(actions.setNewPasswordValidationErrors({}))
    } else {
      const errors = validationMessagesToErrorMap(result.validationMessages)
      yield put(actions.setNewPasswordValidationErrors(errors))
    }
  }
}

export function* savePassword() {
  const username = yield select(usernameSelector)
  const data = yield call(getData)
  const result = yield call(storePassword, username, data)
  if (result.error) {
    if (result.error.valid === false) {
      yield put(actions.savePasswordFailure(null, result.error.validationMessages))
    } else {
      yield put(actions.savePasswordFailure(result.error.errorCode))
    }
  } else {
    const standalone = yield select(standaloneSelector)
    if (standalone) {
      yield call(externalEvents.invokeExternalEvent, 'success', {
        newPassword: data.newPassword
      })
    } else {
      const loginData = yield call(getLoginData)
      yield put(setPassword(loginData.payload.password))
      yield call(loginSaga, loginData)
    }

    yield put(actions.savePasswordSuccess())
  }
}

export function* getData() {
  const input = yield select(inputSelector)
  const password = yield select(passwordSelector)

  return {
    oldPassword: input.oldPassword ? input.oldPassword : password.oldPassword,
    newPassword: password.newPassword
  }
}

export function* getLoginData() {
  const password = yield select(passwordSelector)
  const username = yield select(usernameSelector)

  return {
    payload: {
      username,
      password: password.newPasswordRepeat
    }
  }
}

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.UPDATE_NEW_PASSWORD, updateNewPassword),
    fork(takeLatest, actions.VALIDATE, validate),
    fork(takeLatest, actions.SAVE_PASSWORD, savePassword)
  ])
}
