export const UPDATE_OLD_PASSWORD = 'PasswordUpdateDialog/UPDATE_OLD_PASSWORD'
export const UPDATE_NEW_PASSWORD = 'PasswordUpdateDialog/UPDATE_NEW_PASSWORD'
export const SET_NEW_PASSWORD = 'PasswordUpdateDialog/SET_NEW_PASSWORD'
export const SET_NEW_PASSWORD_VALIDATION_ERRORS = 'PasswordUpdateDialog/SET_NEW_PASSWORD_VALIDATION_ERRORS'
export const UPDATE_NEW_PASSWORD_REPEAT = 'PasswordUpdateDialog/UPDATE_NEW_PASSWORD_REPEAT'
export const SAVE_PASSWORD = 'PasswordUpdateDialog/SAVE_PASSWORD'
export const SAVE_PASSWORD_SUCCESS = 'PasswordUpdateDialog/SAVE_PASSWORD_SUCCESS'
export const SAVE_PASSWORD_FAILURE = 'PasswordUpdateDialog/SAVE_PASSWORD_FAILURE'

export function updateOldPassword(oldPassword) {
  return {
    type: UPDATE_OLD_PASSWORD,
    payload: {
      oldPassword,
    }
  }
}

export function updateNewPassword(newPassword) {
  return {
    type: UPDATE_NEW_PASSWORD,
    payload: {
      newPassword,
    }
  }
}

export function setNewPassword(newPassword) {
  return {
    type: SET_NEW_PASSWORD,
    payload: {
      newPassword,
    }
  }
}

export function setNewPasswordValidationErrors(errors) {
  return {
    type: SET_NEW_PASSWORD_VALIDATION_ERRORS,
    payload: {
      errors,
    }
  }
}

export function updateNewPasswordRepeat(newPasswordRepeat) {
  return {
    type: UPDATE_NEW_PASSWORD_REPEAT,
    payload: {
      newPasswordRepeat,
    }
  }
}

export function savePassword() {
  return {
    type: SAVE_PASSWORD
  }
}

export function savePasswordSuccess() {
  return {
    type: SAVE_PASSWORD_SUCCESS
  }
}

export function savePasswordFailure(validationMessages) {
  return {
    type: SAVE_PASSWORD_FAILURE,
    payload: {
      validationMessages
    }
  }
}
