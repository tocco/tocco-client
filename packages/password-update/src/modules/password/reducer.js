import * as actions from './actions'

const initialState = {
  oldPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
  newPasswordValidationErrors: null,
  passwordUpdatePending: false,
  passwordUpdateFailed: false,
  passwordUpdateErrorCode: null
}

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

function savePassword(state) {
  return Object.assign({}, state, {
    passwordUpdatePending: true,
    passwordUpdateFailed: false
  })
}

function savePasswordSuccess(state) {
  return initialState
}

function savePasswordFailure(state, {payload}) {
  if (payload.validationMessages) {
    const errors = {}
    payload.validationMessages.forEach(message => {
      errors[message.ruleName] = message.message
    })
    return Object.assign({}, state, {
      passwordUpdatePending: false,
      newPasswordValidationErrors: errors
    })
  } else {
    return Object.assign({}, state, {
      passwordUpdatePending: false,
      passwordUpdateFailed: true,
      passwordUpdateErrorCode: payload.errorCode
    })
  }
}

const ACTION_HANDLERS = {
  [actions.UPDATE_OLD_PASSWORD]: updateOldPassword,
  [actions.SET_NEW_PASSWORD]: setNewPassword,
  [actions.SET_NEW_PASSWORD_VALIDATION_ERRORS]: setNewPasswordValidationErrors,
  [actions.UPDATE_NEW_PASSWORD_REPEAT]: updateNewPasswordRepeat,
  [actions.SAVE_PASSWORD]: savePassword,
  [actions.SAVE_PASSWORD_SUCCESS]: savePasswordSuccess,
  [actions.SAVE_PASSWORD_FAILURE]: savePasswordFailure
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
