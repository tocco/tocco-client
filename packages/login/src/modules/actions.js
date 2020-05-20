export const INITIALIZE = 'login/INITIALIZE'
export const INITIALIZED = 'Login/INITIALIZED'
export const LOGIN = 'Login/LOGIN'

export const initialized = () => ({
  type: INITIALIZED
})

export const login = (username, password, executeRecaptcha) => ({
  type: LOGIN,
  payload: {
    username,
    password,
    executeRecaptcha
  }
})

export const initialize = () => ({
  type: INITIALIZE
})
