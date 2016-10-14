export const CHANGE_PAGE = 'Login/CHANGE_PAGE'
export const SET_USERNAME = 'Login/SET_USERNAME'
export const SET_PASSWORD = 'Login/SET_PASSWORD'

export const changePage = page => ({
  type: CHANGE_PAGE,
  payload: {
    page
  }
})

export const setUsername = username => ({
  type: SET_USERNAME,
  payload: {
    username
  }
})

export const setPassword = password => ({
  type: SET_PASSWORD,
  payload: {
    password
  }
})
