export const CONNECT_LOGIN = 'two-factor-connector/CONNECT_LOGIN'
export const INITIALIZE = 'two-factor-connector/INITIALIZE'
export const SET_TWO_STEP_ACTIVE = 'two-factor-connector/SET_TWO_STEP_ACTIVE'
export const SET_SECRET = 'two-factor-connector/SET_SECRET'
export const SET_USER_NAME = 'two-factor-connector/SET_USER_NAME'
export const REQUEST_SECRET = 'two-factor-connector/REQUEST_SECRET'
export const GO_TO_SECRET_VERIFICATION = 'two-factor-connector/GO_TO_SECRET_VERIFICATION'
export const GO_TO_START = 'two-factor-connector/GO_TO_START'
export const GO_TO_SECRET = 'two-factor-connector/GO_TO_SECRET'
export const VERIFY_CODE = 'two-factor-connector/VERIFY_CODE'
export const SUCCESS = 'root/SUCCESS'
export const SET_SETUP_SUCCESSFUL = 'root/SET_SETUP_SUCCESSFUL'
export const GO_TO_RESULT = 'root/GO_TO_RESULT'

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

export const requestSecret = () => ({
  type: REQUEST_SECRET
})

export const goToSecretVerification = () => ({
  type: GO_TO_SECRET_VERIFICATION
})

export const goToStart = () => ({
  type: GO_TO_START
})

export const goToSecret = () => ({
  type: GO_TO_SECRET
})

export const verifyCode = userCode => ({
  type: VERIFY_CODE,
  payload: {
    userCode
  }
})

export const success = () => ({
  type: SUCCESS
})

export const setSetupSuccessful = setupSuccessful => ({
  type: SET_SETUP_SUCCESSFUL,
  payload: {
    setupSuccessful
  }
})

export const goToResult = () => ({
  type: GO_TO_RESULT
})
