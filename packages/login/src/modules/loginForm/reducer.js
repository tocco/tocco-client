import {SET_MESSAGE} from './actions'

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
  [SET_MESSAGE]: setMessage
}

var initialState = {
  message: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
