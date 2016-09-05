import {UPDATE_NEW_PASSWORD, setNewPassword, setNewPasswordValidationErrors} from './actions'
import {takeLatest} from 'redux-saga'
import {call, fork, select, put} from 'redux-saga/effects'
import validate from './validate'

function* updateNewPassword(action) {
  const validationRules = yield select(state => state.validationRules)
  const oldPassword = yield select(state => state.password.oldPassword)
  const errors = validate(action.payload.newPassword, oldPassword, validationRules)
  yield [
    put(setNewPassword(action.payload.newPassword)),
    put(setNewPasswordValidationErrors(errors))
  ]
}

export default function* sagas() {
  yield [
    fork(takeLatest, UPDATE_NEW_PASSWORD, updateNewPassword),
  ]
}
