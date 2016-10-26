import {SET_MESSAGE, SET_PENDING} from './actions'
import {LOGIN} from '../actions'

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

const login = state => ({
  ...state,
  loginPending: true
})

const ACTION_HANDLERS = {
  [SET_MESSAGE]: setMessage,
  [SET_PENDING]: setPending,
  [LOGIN]: login
}

const initialState = {
  message: {},
  loginPending: false
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
