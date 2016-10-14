import {SET_USERNAME, SET_MESSAGE} from './actions'

function setUsername(state, {payload}) {
  const {username} = payload
  return {
    ...state,
    username: username
  }
}

function setMessage(state, {payload}) {
  const {text, negative} = payload
  return {
    ...state,
    message: {
      text,
      negative
    }
  }
}

const ACTION_HANDLERS = {
  [SET_USERNAME]: setUsername,
  [SET_MESSAGE]: setMessage
}

var initialState = {
  username: '',
  message: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
