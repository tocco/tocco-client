import {UPDATE_OLD_PASSWORD, UPDATE_NEW_PASSWORD, UPDATE_NEW_PASSWORD_REPEAT} from './actions'

function updateOldPassword(state, {payload}) {
  return Object.assign({}, state, {
    oldPassword: payload.oldPassword
  })
}

function updateNewPassword(state, {payload}) {
  return Object.assign({}, state, {
    newPassword: payload.newPassword
  })
}

function updateNewPasswordRepeat(state, {payload}) {
  return Object.assign({}, state, {
    newPasswordRepeat: payload.newPasswordRepeat
  })
}

const ACTION_HANDLERS = {
  [UPDATE_OLD_PASSWORD]: updateOldPassword,
  [UPDATE_NEW_PASSWORD]: updateNewPassword,
  [UPDATE_NEW_PASSWORD_REPEAT]: updateNewPasswordRepeat
}

const initialState = {
  oldPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
  newPasswordValid: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
