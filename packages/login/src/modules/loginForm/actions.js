export const SET_MESSAGE = 'Login/SET_MESSAGE'
export const SET_PENDING = 'Login/SET_PENDING'

export function setMessage(text, negative = false) {
  return {
    type: SET_MESSAGE,
    payload: {
      text,
      negative
    }
  }
}

export function setPending(pending = false) {
  return {
    type: SET_PENDING,
    payload: {
      pending
    }
  }
}
