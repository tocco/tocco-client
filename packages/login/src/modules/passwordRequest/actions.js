export const REQUEST_PASSWORD = 'Login/REQUEST_PASSWORD'
export const REQUEST_USERNAME = 'Login/REQUEST_USERNAME'
export const SET_USERNAME = 'Login/SET_USERNAME'

export const requestPassword = username => ({
  type: REQUEST_PASSWORD,
  payload: {
    username
  }
})

export const setRequestUsername = username => ({
  type: REQUEST_USERNAME,
  payload: {
    username
  }
})

export const setUsername = username => ({
  type: SET_USERNAME,
  payload: {
    username
  }
})
