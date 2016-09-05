import {UPDATE_OLD_PASSWORD, SET_NEW_PASSWORD, SET_NEW_PASSWORD_VALIDATION_ERRORS, UPDATE_NEW_PASSWORD_REPEAT} from './actions'
import validate from './validate'

function updateOldPassword(state, {payload}) {
  return Object.assign({}, state, {
    oldPassword: payload.oldPassword
  })
}

function setNewPassword(state, {payload}) {
  return Object.assign({}, state, {
    newPassword: payload.newPassword
  })
}

function setNewPasswordValidationErrors(state, {payload}) {
  return Object.assign({}, state, {
    newPasswordValidationErrors: payload.errors
  })
}

function updateNewPasswordRepeat(state, {payload}) {
  return Object.assign({}, state, {
    newPasswordRepeat: payload.newPasswordRepeat
  })
}

const ACTION_HANDLERS = {
  [UPDATE_OLD_PASSWORD]: updateOldPassword,
  [SET_NEW_PASSWORD]: setNewPassword,
  [SET_NEW_PASSWORD_VALIDATION_ERRORS]: setNewPasswordValidationErrors,
  [UPDATE_NEW_PASSWORD_REPEAT]: updateNewPasswordRepeat
}

const initialState = {
  oldPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
  newPasswordValidationErrors: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
