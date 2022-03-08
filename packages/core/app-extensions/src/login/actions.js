export const SET_LOGGED_IN = 'login/SET_LOGGED_IN'
export const SET_ADMIN_ALLOWED = 'login/SET_ADMIN_ALLOWED'
export const DO_SESSION_CHECK = 'login/DO_SESSION_CHECK'

export const setLoggedIn = loggedIn => ({
  type: SET_LOGGED_IN,
  payload: {
    loggedIn
  }
})

export const setAdminAllowed = adminAllowed => ({
  type: SET_ADMIN_ALLOWED,
  payload: {
    adminAllowed
  }
})

export const doSessionCheck = () => ({
  type: DO_SESSION_CHECK
})
