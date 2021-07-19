export const LOAD_SETTINGS_AND_PREFERENCES = 'preferences/LOAD_SETTINGS_AND_PREFERENCES'
export const SET_SERVER_SETTINGS = 'preferences/SET_SERVER_SETTINGS'
export const SET_USER_PREFERENCES = 'preferences/SET_USER_PREFERENCES'
export const SAVE_USER_PREFERENCE = 'preferences/SAVE_USER_PREFERENCE'

export const loadSettingsAndPreferences = () => ({
  type: LOAD_SETTINGS_AND_PREFERENCES
})

export const setServerSettings = serverSettings => ({
  type: SET_SERVER_SETTINGS,
  payload: {
    serverSettings
  }
})

export const setUserPreferences = userPreferences => ({
  type: SET_USER_PREFERENCES,
  payload: {
    userPreferences
  }
})

export const saveUserPreferences = (key, value) => ({
  type: SAVE_USER_PREFERENCE,
  payload: {
    key,
    value
  }
})
