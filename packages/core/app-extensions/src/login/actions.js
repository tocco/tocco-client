export const SET_LOGGED_IN = 'login/SET_LOGGED_IN'
export const SET_ADMIN_ALLOWED = 'login/SET_ADMIN_ALLOWED'

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
