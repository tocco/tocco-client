import * as actions from './actions'
import {takeLatest} from 'redux-saga'
import {call, fork, select, put} from 'redux-saga/effects'
import validate from './validate'
import invokeExternalEvent from '../../utils/ExternalEvents'

export const validationRulesSelector = state => state.validationRules
export const principalPkInputSelector = state => state.input.principalPk
export const passwordSelector = state => state.password

function doRequest(data, principalPk, action, onSuccess, onError) {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: 'include'
  }

  return new Promise((resolve, reject) => {
    fetch(`${__BACKEND_URL__}/nice2/rest/principals/${principalPk}/${action}`, options)
      .then(resp => {
        if (resp.ok === true) {
          onSuccess(resp, resolve)
        } else {
          onError(resp, resolve)
        }
      })
  })
}

function storePassword(principalPk, oldPassword, newPassword) {
  if (__DEV__) {
    if (console) console.log('Store password call would take place now')
    return new Promise(resolve => resolve({
      error: null
    }))
  } else {
    const data = {
      oldPassword,
      newPassword
    }

    const onSuccess = function(resp, resolve) {
      resolve({
        error: null
      })
    }

    const onError = function(resp, resolve) {
      resp.json().then(json => resolve({
        error: json
      }))
    }

    return doRequest(data, principalPk, 'password-update', onSuccess, onError)
  }
}

function remoteValidatePassword(principalPk, oldPassword, newPassword) {
  if (__DEV__) {
    if (console) console.log('Validate password call would take place now')
    if (newPassword.includes('tocco')) {
      return new Promise(resolve => resolve({
        error: {
          valid: false,
          validationMessages: [{ruleName: 'DICTIONARY',
            message: 'Das neue Passwort darf das Wort "tocco" nicht enthalten'}]
        }
      }))
    } else {
      return new Promise(resolve => resolve({
        error: false
      }))
    }
  } else {
    const data = {
      newPassword
    }

    const onSuccess = function(resp, resolve) {
      resp.json().then(json => {
        resolve({error: json.valid ? null : json})
      })
    }

    const onError = function(resp, resolve) {
      resp.json().then(json => resolve({
        error: json
      }))
    }

    return doRequest(data, principalPk, 'password-validation', onSuccess, onError)
  }
}

function* updateNewPassword(action) {
  const validationRules = yield select(validationRulesSelector)
  const oldPassword = yield select(state => state.password.oldPassword)
  const errors = validate(action.payload.newPassword, oldPassword, validationRules)

  yield put(actions.setNewPasswordValidationErrors(errors))
  if (isEmptyObject(errors)) {
    yield validatePassword(action.payload.newPassword)
  }
  yield put(actions.setNewPassword(action.payload.newPassword))
}

function isEmptyObject(object) {
  // http://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
  return Object.keys(object).length === 0 && object.constructor === Object
}

function* savePassword() {
  yield saveOrValidate(yield select(passwordSelector), storePassword, actions.savePasswordSuccess())
  yield call(invokeExternalEvent, 'close')
}

function* validatePassword(newPassword) {
  yield saveOrValidate({newPassword: newPassword, oldPassword: null}, remoteValidatePassword, null)
}

function* saveOrValidate(password, remoteFunction, success) {
  const principalPk = yield select(principalPkInputSelector)
  const result = yield call(remoteFunction, principalPk, password.oldPassword, password.newPassword)
  if (result.error) {
    if (result.error.valid === false) {
      yield put(actions.savePasswordFailure(null, result.error.validationMessages))
    } else {
      yield put(actions.savePasswordFailure(result.error.errorCode))
    }
  } else {
    if (success) {
      yield put(success)
    }
  }
}

export default function* sagas() {
  yield [
    fork(takeLatest, actions.UPDATE_NEW_PASSWORD, updateNewPassword),
    fork(takeLatest, actions.SAVE_PASSWORD, savePassword)
  ]
}
