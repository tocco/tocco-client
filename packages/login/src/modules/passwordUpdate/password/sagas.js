import {externalEvents, rest} from 'tocco-app-extensions'
import {takeLatest, call, fork, select, put, all} from 'redux-saga/effects'

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
export const intlSelector = state => state.intl

export function* storePassword(username, data) {
  const options = {
    method: 'POST',
    acceptedStatusCodes: [400],
    body: data
  }

  try {
    const resp = yield call(rest.requestSaga, `principals/${username}/password-update`, options)
    return resp.ok ? {error: null} : {error: resp.body}
  } catch (exception) {
    return {error: {errorCode: 'UNEXPECTED_ERROR', exception}}
  }
}

export function* remoteValidate(username, data) {
  const {locale} = yield select(intlSelector)

  const options = {
    method: 'POST',
    body: data,
    queryParams: {locale}
  }

  try {
    const resp = yield call(rest.requestSaga, `principals/${username}/password-validation`, options)
    return resp.body
  } catch (exception) {
    // validation request failed for some reason. we ignore that.
    // (validation takes place on actual update request again)
    return {valid: true, exception}
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
      yield put(externalEvents.fireExternalEvent('success', {
        newPassword: data.newPassword
      }))
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

export function* formChanged() {
  yield put(actions.resetPasswordUpdateFailed())
}

export default function* sagas() {
  yield all([
    fork(takeLatest, actions.UPDATE_NEW_PASSWORD, updateNewPassword),
    fork(takeLatest, actions.VALIDATE, validate),
    fork(takeLatest, actions.SAVE_PASSWORD, savePassword),
    fork(takeLatest, actions.UPDATE_NEW_PASSWORD, formChanged),
    fork(takeLatest, actions.UPDATE_OLD_PASSWORD, formChanged),
    fork(takeLatest, actions.UPDATE_NEW_PASSWORD_REPEAT, formChanged)
  ])
}
