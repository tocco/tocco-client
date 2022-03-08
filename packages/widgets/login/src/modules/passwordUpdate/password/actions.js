export const UPDATE_OLD_PASSWORD = 'PasswordUpdateDialog/UPDATE_OLD_PASSWORD'
export const UPDATE_NEW_PASSWORD = 'PasswordUpdateDialog/UPDATE_NEW_PASSWORD'
export const SET_NEW_PASSWORD = 'PasswordUpdateDialog/SET_NEW_PASSWORD'
export const SET_NEW_PASSWORD_VALIDATION_ERRORS = 'PasswordUpdateDialog/SET_NEW_PASSWORD_VALIDATION_ERRORS'
export const UPDATE_NEW_PASSWORD_REPEAT = 'PasswordUpdateDialog/UPDATE_NEW_PASSWORD_REPEAT'
export const SAVE_PASSWORD = 'PasswordUpdateDialog/SAVE_PASSWORD'
export const SAVE_PASSWORD_SUCCESS = 'PasswordUpdateDialog/SAVE_PASSWORD_SUCCESS'
export const SAVE_PASSWORD_FAILURE = 'PasswordUpdateDialog/SAVE_PASSWORD_FAILURE'
export const VALIDATE = 'PasswordUpdateDialog/VALIDATE'
export const RESET_PASSWORD_UPDATED_FAILED = 'PasswordUpdateDialog/RESET_PASSWORD_UPDATED_FAILED'

export const updateOldPassword = oldPassword => ({
  type: UPDATE_OLD_PASSWORD,
  payload: {
    oldPassword
  }
})

export const updateNewPassword = newPassword => ({
  type: UPDATE_NEW_PASSWORD,
  payload: {
    newPassword
  }
})

export const setNewPassword = newPassword => ({
  type: SET_NEW_PASSWORD,
  payload: {
    newPassword
  }
})

export const setNewPasswordValidationErrors = errors => ({
  type: SET_NEW_PASSWORD_VALIDATION_ERRORS,
  payload: {
    errors
  }
})

export const updateNewPasswordRepeat = newPasswordRepeat => ({
  type: UPDATE_NEW_PASSWORD_REPEAT,
  payload: {
    newPasswordRepeat
  }
})

export const savePassword = captchaToken => ({
  type: SAVE_PASSWORD,
  payload: {
    captchaToken
  }
})

export const savePasswordSuccess = () => ({
  type: SAVE_PASSWORD_SUCCESS
})

export const savePasswordFailure = (errorCode, validationMessages) => ({
  type: SAVE_PASSWORD_FAILURE,
  payload: {
    errorCode,
    validationMessages
  }
})

export const validate = () => ({
  type: VALIDATE
})

export const resetPasswordUpdateFailed = () => ({
  type: RESET_PASSWORD_UPDATED_FAILED
})
