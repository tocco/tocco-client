export const SET_USERNAME = 'Login/SET_USERNAME'
export const SET_MESSAGE = 'Login/SET_MESSAGE'

export function setUsername(username) {
  return {
    type: SET_USERNAME,
    payload: {
      username
    }
  }
}

export function setMessage(text, negative = false) {
  return {
    type: SET_MESSAGE,
    payload: {
      text,
      negative
    }
  }
}
