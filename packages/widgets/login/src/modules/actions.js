export const INITIALIZE = 'login/INITIALIZE'
export const INITIALIZED = 'Login/INITIALIZED'
export const LOGIN = 'Login/LOGIN'

export const initialized = () => ({
  type: INITIALIZED
})

export const login = (username, password, captchaToken) => ({
  type: LOGIN,
  payload: {
    username,
    password,
    captchaToken
  }
})

export const initialize = () => ({
  type: INITIALIZE
})
