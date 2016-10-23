import {ExternalEvents} from 'tocco-util'
import {takeLatest} from 'redux-saga'
import {call, fork, select, put} from 'redux-saga/effects'

import * as actions from './actions'
import localValidate from './validate'
import {isEmptyObject, validationMessagesToErrorMap} from './utils'
import {loginSaga} from '../../sagas'

export const validationRulesSelector = state => state.passwordUpdate.validationRules
export const inputSelector = state => state.input
export const usernameSelector = state => state.passwordUpdate.dialog.username
export const passwordSelector = state => state.passwordUpdate.password
export const standaloneSelector = state => state.passwordUpdate.standalone

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
  if (__DEV__) {
    if (console) console.log('DEV MODE: Store password call would take place now')
    return new Promise(resolve => resolve({
      error: null
    }))
  } else {
    return new Promise((resolve, reject) => {
      doRequest(data, username, 'password-update')
        .then(resp => {
          if (resp.ok === true) {
            resolve({
              error: null
            })
          } else {
            resp.json().then(json => resolve({
              error: json
            }))
          }
        })
    })
  }
}

export function remoteValidate(username, data) {
  if (__DEV__) {
    if (console) console.log('DEV MODE: Validate password call would take place now')
    if (data.newPassword.includes('tocco')) {
      return new Promise(resolve => resolve({
        valid: false,
        validationMessages: [{
          ruleName: 'DICTIONARY',
          message: 'Das neue Passwort darf das Wort "tocco" nicht enthalten'
        }]
      }))
    } else {
      return new Promise(resolve => resolve({
        valid: true
      }))
    }
  } else {
    return new Promise((resolve, reject) => {
      doRequest(data, username, 'password-validation')
        .then(resp => {
          if (resp.ok === true) {
            resp.json().then(json => resolve(json))
          } else {
            resp.json().then(() => resolve({
              // validation request failed for some reason. we ignore that.
              // (validation takes place on actual update request again)
              valid: true
            }))
          }
        })
    })
  }
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
      yield call(ExternalEvents.invokeExternalEvent, 'success', {
        newPassword: data.newPassword
      })
    } else {
      const loginData = yield call(getLoginData)
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
  yield [
    fork(takeLatest, actions.UPDATE_NEW_PASSWORD, updateNewPassword),
    fork(takeLatest, actions.VALIDATE, validate),
    fork(takeLatest, actions.SAVE_PASSWORD, savePassword)
  ]
}
