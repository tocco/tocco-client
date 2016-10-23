export const REQUEST_PASSWORD = 'Login/REQUEST_PASSWORD'

export const requestPassword = username => ({
  type: REQUEST_PASSWORD,
  payload: {
    username
  }
})
