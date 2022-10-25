export const LOAD_USER = 'userMenu/LOAD_USER'
export const SET_LOGGED_IN = 'userMenu/SET_LOGGED_IN'
export const SET_USERNAME = 'userMenu/SET_USERNAME'
export const LOGOUT = 'userMenu/LOGOUT'

export const loadUser = () => ({
  type: LOAD_USER
})

export const setLoggedIn = loggedIn => ({
  type: SET_LOGGED_IN,
  payload: {
    loggedIn
  }
})

export const setUsername = username => ({
  type: SET_USERNAME,
  payload: {
    username
  }
})

export const logout = () => ({
  type: LOGOUT
})
