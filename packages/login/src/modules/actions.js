export const INITIALIZED = 'INITIALIZED'
export const LOGIN = 'LOGIN'
export const UPDATE_LOGIN_CHANGE = 'UPDATE_LOGIN_CHANGE'

export const initialized = () => ({
  type: INITIALIZED
})

export function login(username, password) {
  return {
    type: LOGIN,
    payload: {
      username,
      password
    }
  }
}
