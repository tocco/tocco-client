export const SET_MESSAGE = 'Login/SET_MESSAGE'
export const SET_PENDING = 'Login/SET_PENDING'
export const ACTIVATE_RECAPTCHA = 'loginForm/ACTIVATE_RECAPTCHA'

export const setMessage = (text, negative = false) => ({
  type: SET_MESSAGE,
  payload: {
    text,
    negative
  }
})

export const setPending = (pending = false) => ({
  type: SET_PENDING,
  payload: {
    pending
  }
})

export const activateRecaptcha = () => ({
  type: ACTIVATE_RECAPTCHA
})
