export const TWOSTEPLOGIN = 'Login/TWOSTEPLOGIN'

export const twoStepLogin = (username, password, userCode) => ({
  type: TWOSTEPLOGIN,
  payload: {
    username,
    password,
    userCode
  }
})
