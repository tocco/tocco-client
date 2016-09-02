export const UPDATE_OLD_PASSWORD = 'PasswordUpdateDialog/UPDATE_OLD_PASSWORD'
export const UPDATE_NEW_PASSWORD = 'PasswordUpdateDialog/UPDATE_NEW_PASSWORD'
export const UPDATE_NEW_PASSWORD_REPEAT = 'PasswordUpdateDialog/UPDATE_NEW_PASSWORD_REPEAT'

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

export function updateNewPasswordRepeat(newPasswordRepeat) {
  return {
    type: UPDATE_NEW_PASSWORD_REPEAT,
    payload: {
      newPasswordRepeat,
    }
  }
}

