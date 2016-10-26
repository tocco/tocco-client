import * as actions from './actions'
import {validationMessagesToErrorMap} from './utils'

const initialState = {
  oldPassword: '',
  newPassword: '',
  newPasswordRepeat: '',
  newPasswordValidationErrors: null,
  passwordUpdatePending: false,
  passwordUpdateFailed: false,
  passwordUpdateErrorCode: null
}

const updateOldPassword = (state, {payload}) => ({
  ...state,
  oldPassword: payload.oldPassword
})

const setNewPassword = (state, {payload}) => ({
  ...state,
  newPassword: payload.newPassword
})

const setNewPasswordValidationErrors = (state, {payload}) => ({
  ...state,
  newPasswordValidationErrors: payload.errors
})

const updateNewPasswordRepeat = (state, {payload}) => ({
  ...state,
  newPasswordRepeat: payload.newPasswordRepeat
})

const savePassword = state => ({
  ...state,
  passwordUpdatePending: true,
  passwordUpdateFailed: false
})

const savePasswordSuccess = state => (
  initialState
)

const savePasswordFailure = (state, {payload}) => {
  if (payload.validationMessages) {
    const errors = validationMessagesToErrorMap(payload.validationMessages)
    return {
      ...state,
      passwordUpdatePending: false,
      newPasswordValidationErrors: errors
    }
  } else {
    return {
      ...state,
      passwordUpdatePending: false,
      passwordUpdateFailed: true,
      passwordUpdateErrorCode: payload.errorCode
    }
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
