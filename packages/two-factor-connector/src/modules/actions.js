export const CONNECT_LOGIN = 'two-factor-connector/CONNECT_LOGIN'
export const INITIALIZE = 'two-factor-connector/INITIALIZE'
export const SET_TWO_STEP_ACTIVE = 'two-factor-connector/SET_TWO_STEP_ACTIVE'
export const SET_SECRET = 'two-factor-connector/SET_SECRET'
export const SET_USER_NAME = 'two-factor-connector/SET_USER_NAME'

export const connectLogin = () => ({
  type: CONNECT_LOGIN
})

export const initialize = () => ({
  type: INITIALIZE
})

export const setTwoFactorActive = twoFactorActive => ({
  type: SET_TWO_STEP_ACTIVE,
  payload: {
    twoFactorActive
  }
})

export const setSecret = secret => ({
  type: SET_SECRET,
  payload: {
    secret
  }
})

export const setUserName = username => ({
  type: SET_USER_NAME,
  payload: {
    username
  }
})
