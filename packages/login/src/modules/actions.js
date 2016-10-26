export const INITIALIZED = 'Login/INITIALIZED'
export const LOGIN = 'Login/LOGIN'
export const CHECK_SESSION = 'Login/CHECK_SESSION'

export const initialized = () => ({
  type: INITIALIZED
})

export const login = (username, password) => ({
  type: LOGIN,
  payload: {
    username,
    password
  }
})

export const checkSession = () => ({
  type: CHECK_SESSION
})
