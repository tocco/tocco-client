export const SET_SHOW_OLD_PASSWORD = 'PasswordUpdateDialog/SET_SHOW_OLD_PASSWORD'
export const SET_STANDALONE = 'PasswordUpdateDialog/SET_STANDALONE'
export const SET_FORCED_UPDATE = 'PasswordUpdateDialog/SET_FORCED_UPDATE'
export const SET_USERNAME_OR_PK = 'PasswordUpdateDialog/SET_USERNAME_OR_PK'

export const setShowOldPasswordField = showOldPasswordField => ({
  type: SET_SHOW_OLD_PASSWORD,
  payload: {
    showOldPasswordField
  }
})

export const setForcedUpdate = forcedUpdate => ({
  type: SET_FORCED_UPDATE,
  payload: {
    forcedUpdate
  }
})

export const setStandalone = standalone => ({
  type: SET_STANDALONE,
  payload: {
    standalone
  }
})

export const setUsernameOrPk = usernameOrPk => ({
  type: SET_USERNAME_OR_PK,
  payload: {
    usernameOrPk
  }
})
