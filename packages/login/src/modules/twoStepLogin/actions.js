export const TWOSTEPLOGIN = 'Login/TWOSTEPLOGIN'
export const SET_REQUESTED_CODE = 'Login/SET_REQUESTED_CODE'

export const twoStepLogin = (username, password, requestedCode, userCode) => ({
  type: TWOSTEPLOGIN,
  payload: {
    username,
    password,
    requestedCode,
    userCode
  }
})

export const setRequestedCode = requestedCode => ({
  type: SET_REQUESTED_CODE,
  payload: {
    requestedCode
  }
})
