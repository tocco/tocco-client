export const TWOSTEPLOGIN = 'Login/TWOSTEPLOGIN'
export const SET_SECRET = 'Login/SET_SECRET'

export const twoStepLogin = (username, password, userCode) => ({
  type: TWOSTEPLOGIN,
  payload: {
    username,
    password,
    userCode
  }
})

export const setSecret = secret => ({
  type: SET_SECRET,
  payload: {
    secret
  }
})
