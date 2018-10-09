export const REQUEST_PASSWORD = 'Login/REQUEST_PASSWORD'
export const PASSWORD_REQUEST = 'Login/PASSWORD_REQUEST'
export const SET_USERNAME = 'Login/SET_USERNAME'

export const requestPassword = username => ({
  type: REQUEST_PASSWORD,
  payload: {
    username
  }
})

export const setPasswordRequest = passwordRequest => ({
  type: PASSWORD_REQUEST,
  payload: {
    passwordRequest
  }
})

export const setUsername = username => ({
  type: SET_USERNAME,
  payload: {
    username
  }
})
