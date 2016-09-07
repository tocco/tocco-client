import * as actions from './actions'
import {takeLatest} from 'redux-saga'
import {call, fork, select, put} from 'redux-saga/effects'
import validate from './validate'
import invokeExternalEvent from '../../utils/ExternalEvents'

export const validationRulesSelector = state => state.validationRules
export const principalPkInputSelector = state => state.input.principalPk
export const passwordSelector = state => state.password

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
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      credentials: 'include'
    }

    return new Promise((resolve, reject) => {
      fetch(`${__BACKEND_URL__}/nice2/rest/principals/${principalPk}/password-update`, options)
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

function* updateNewPassword(action) {
  const validationRules = yield select(validationRulesSelector)
  const oldPassword = yield select(state => state.password.oldPassword)
  const errors = validate(action.payload.newPassword, oldPassword, validationRules)
  yield [
    put(actions.setNewPassword(action.payload.newPassword)),
    put(actions.setNewPasswordValidationErrors(errors))
  ]
}

function* savePassword() {
  const principalPk = yield select(principalPkInputSelector)
  const password = yield select(passwordSelector)
  const result = yield call(storePassword, principalPk, password.oldPassword, password.newPassword)
  if (result.error) {
    if (result.error.valid === false) {
      yield put(actions.savePasswordFailure(result.error.validationMessages))
    } else {
      yield put(actions.savePasswordFailure())
    }
  } else {
    yield put(actions.savePasswordSuccess())
    yield call(invokeExternalEvent, 'close')
  }
}

export default function* sagas() {
  yield [
    fork(takeLatest, actions.UPDATE_NEW_PASSWORD, updateNewPassword),
    fork(takeLatest, actions.SAVE_PASSWORD, savePassword)
  ]
}
