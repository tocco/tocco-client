import {takeLatest, call, select, put, all} from 'redux-saga/effects'
import {externalEvents, rest} from 'tocco-app-extensions'

import {setPassword} from '../../login/actions'
import {loginSaga} from '../../sagas'
import * as actions from './actions'
import {isEmptyObject, validationMessagesToErrorMap} from './utils'
import localValidate from './validate'

export const validationRulesSelector = state => state.passwordUpdate.validationRules
export const inputSelector = state => state.input
export const usernameOrPkSelector = state => state.passwordUpdate.dialog.usernameOrPk
export const passwordSelector = state => state.passwordUpdate.password
export const standaloneSelector = state => state.passwordUpdate.dialog.standalone
export const intlSelector = state => state.intl

export function* storePassword(usernameOrPk, data, captchaToken) {
  const options = {
    method: 'POST',
    acceptedStatusCodes: [400],
    body: {
      ...data,
      captchaToken
    }
  }

  try {
    const resp = yield call(rest.requestSaga, `principals/${usernameOrPk}/password-update`, options)
    return resp.ok ? {error: null} : {error: resp.body}
  } catch (exception) {
    return {error: {errorCode: 'UNEXPECTED_ERROR', exception}}
  }
}

export function* remoteValidate(usernameOrPk, data) {
  const {locale} = yield select(intlSelector)

  const options = {
    method: 'POST',
    body: data,
    queryParams: {locale}
  }

  try {
    const resp = yield call(rest.requestSaga, `principals/${usernameOrPk}/password-validation`, options)
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
    const usernameOrPk = yield select(usernameOrPkSelector)
    const data = yield call(getData)
    const result = yield call(remoteValidate, usernameOrPk, data)
    if (result.valid === true) {
      yield put(actions.setNewPasswordValidationErrors({}))
    } else {
      const validationMessageErrors = validationMessagesToErrorMap(result.validationMessages)
      yield put(actions.setNewPasswordValidationErrors(validationMessageErrors))
    }
  }
}

export function* savePassword({payload: {captchaToken}}) {
  const usernameOrPk = yield select(usernameOrPkSelector)
  const data = yield call(getData)
  const result = yield call(storePassword, usernameOrPk, data, captchaToken)

  if (result.error) {
    if (result.error.valid === false) {
      yield put(actions.savePasswordFailure(null, result.error.validationMessages))
    } else {
      yield put(actions.savePasswordFailure(result.error.errorCode))
    }
  } else {
    const standalone = yield select(standaloneSelector)
    if (standalone) {
      yield put(
        externalEvents.fireExternalEvent('success', {
          newPassword: data.newPassword
        })
      )
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
  const usernameOrPk = yield select(usernameOrPkSelector)

  return {
    payload: {
      username: usernameOrPk,
      password: password.newPasswordRepeat
    }
  }
}

export function* formChanged() {
  yield put(actions.resetPasswordUpdateFailed())
}

export default function* sagas() {
  yield all([
    takeLatest(actions.UPDATE_NEW_PASSWORD, updateNewPassword),
    takeLatest(actions.VALIDATE, validate),
    takeLatest(actions.SAVE_PASSWORD, savePassword),
    takeLatest(actions.UPDATE_NEW_PASSWORD, formChanged),
    takeLatest(actions.UPDATE_OLD_PASSWORD, formChanged),
    takeLatest(actions.UPDATE_NEW_PASSWORD_REPEAT, formChanged)
  ])
}
