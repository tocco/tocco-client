export const SET_SHOW_OLD_PASSWORD = 'PasswordUpdateDialog/SET_SHOW_OLD_PASSWORD'
export const SET_STANDALONE = 'PasswordUpdateDialog/SET_STANDALONE'
export const SET_FORCED_UPDATE = 'PasswordUpdateDialog/SET_FORCED_UPDATE'
export const SET_USERNAME = 'PasswordUpdateDialog/SET_USERNAME'
export function setShowOldPasswordField(showOldPasswordField) {
  return {
    type: SET_SHOW_OLD_PASSWORD,
    payload: {
      showOldPasswordField
    }
  }
}

export function setForcedUpdate(forcedUpdate) {
  return {
    type: SET_FORCED_UPDATE,
    payload: {
      forcedUpdate
    }
  }
}

export function setStandalone(standalone) {
  return {
    type: SET_STANDALONE,
    payload: {
      standalone
    }
  }
}

export function setUsername(username) {
  return {
    type: SET_USERNAME,
    payload: {
      username
    }
  }
}
