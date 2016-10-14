export const SET_MESSAGE = 'Login/SET_MESSAGE'

export function setMessage(text, negative = false) {
  return {
    type: SET_MESSAGE,
    payload: {
      text,
      negative
    }
  }
}
