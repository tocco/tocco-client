import {SET_MESSAGE, SET_PENDING, ACTIVATE_RECAPTCHA} from './actions'

const setMessage = (state, {payload}) => {
  const {text, negative} = payload
  return {
    ...state,
    message: {
      text,
      negative
    }
  }
}

const setPending = (state, {payload}) => ({
  ...state,
  loginPending: payload.pending
})

const activateRecaptcha = state => ({
  ...state,
  recaptchaActivated: true
})

const ACTION_HANDLERS = {
  [SET_MESSAGE]: setMessage,
  [SET_PENDING]: setPending,
  [ACTIVATE_RECAPTCHA]: activateRecaptcha
}

const initialState = {
  message: {},
  loginPending: false,
  recaptchaActivated: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
