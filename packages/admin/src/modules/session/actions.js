export const SET_LOGGED_IN = 'root/SET_LOGGED_IN'
export const DO_SESSION_HEART_BEAT = 'root/DO_SESSION_HEART_BEAT'
export const DO_LOGOUT = 'session/DO_LOGOUT'
export const LOGIN_SUCCESSFUL = 'session/LOGIN_SUCCESSFUL'
export const DO_SESSION_CHECK = 'session/DO_SESSION_CHECK'export const LOAD_PRINCIPAL = 'session/LOAD_PRINCIPAL'export const SET_USERNAME = 'session/SET_USERNAME'export const SET_CURRENT_BUSINESS_UNIT = 'session/SET_CURRENT_BUSINESS_UNIT'export const LOAD_BUSINESS_UNITS = 'session/LOAD_BUSINESS_UNITS'export const SET_BUSINESS_UNITS = 'session/SET_BUSINESS_UNITS'export const CHANGE_BUSINESS_UNIT = 'session/CHANGE_BUSINESS_UNIT'

export const setLoggedIn = loggedIn => ({
  type: SET_LOGGED_IN,
  payload: {
    loggedIn
  }
})

export const doSessionHeartBeat = timeout => ({
  type: DO_SESSION_HEART_BEAT,
  payload: {
    timeout
  }
})

export const doLogout = () => ({
  type: DO_LOGOUT
})

export const loginSuccessful = sessionTimeout => ({
  type: LOGIN_SUCCESSFUL,
  payload: {
    sessionTimeout
  }
})

export const doSessionCheck = () => ({
  type: DO_SESSION_CHECK
})

export const loadPrincipal = () => ({
  type: LOAD_PRINCIPAL
})

export const setUsername = username => ({
  type: SET_USERNAME,
  payload: {
    username
  }
})

export const setCurrentBusinessUnit = currentBusinessUnit => ({
  type: SET_CURRENT_BUSINESS_UNIT,
  payload: {
    currentBusinessUnit
  }
})

export const loadBusinessUnits = () => ({
  type: LOAD_BUSINESS_UNITS
})

export const setBusinessUnits = businessUnits => ({
  type: SET_BUSINESS_UNITS,
  payload: {
    businessUnits
  }
})

export const changeBusinessUnit = businessUnitId => ({
  type: CHANGE_BUSINESS_UNIT,
  payload: {
    businessUnitId
  }
})
