export const INITIALIZED = 'Login/INITIALIZED'
export const LOGIN = 'Login/LOGIN'
export const CHECK_SESSION = 'Login/CHECK_SESSION'

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

export function checkSession() {
  return {
    type: CHECK_SESSION
  }
}
