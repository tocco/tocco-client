export const SET_LOGGED_IN = 'root/SET_LOGGED_IN'
export const DO_SESSION_HEART_BEAT = 'root/DO_SESSION_HEART_BEAT'
export const DO_LOGOUT = 'session/DO_LOGOUT'
export const LOGIN_SUCCESSFUL = 'session/LOGIN_SUCCESSFUL'
export const DO_SESSION_CHECK = 'session/DO_SESSION_CHECK'

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
