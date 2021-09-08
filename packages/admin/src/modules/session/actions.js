export const DO_LOGOUT = 'session/DO_LOGOUT'
export const LOGIN_SUCCESSFUL = 'session/LOGIN_SUCCESSFUL'
export const LOAD_PRINCIPAL = 'session/LOAD_PRINCIPAL'
export const SET_USERNAME = 'session/SET_USERNAME'
export const SET_CURRENT_BUSINESS_UNIT = 'session/SET_CURRENT_BUSINESS_UNIT'
export const LOAD_BUSINESS_UNITS = 'session/LOAD_BUSINESS_UNITS'
export const SET_BUSINESS_UNITS = 'session/SET_BUSINESS_UNITS'
export const CHANGE_BUSINESS_UNIT = 'session/CHANGE_BUSINESS_UNIT'
export const CHECK_SSO_AVAILABLE = 'session/CHECK_SSO_AVAILABLE'
export const SET_SSO_AVAILABLE = 'session/SET_SSO_AVAILABLE'

export const doLogout = () => ({
  type: DO_LOGOUT
})

export const loginSuccessful = sessionTimeout => ({
  type: LOGIN_SUCCESSFUL,
  payload: {
    sessionTimeout
  }
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

export const checkSsoAvailable = () => ({
  type: CHECK_SSO_AVAILABLE
})

export const setSsoAvailable = ssoAvailable => ({
  type: SET_SSO_AVAILABLE,
  payload: {
    ssoAvailable
  }
})
