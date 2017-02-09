import * as actions from './actions'

const MAX_LOGGED_ERRORS_MESSAGE = 100
const logError = (state, {payload: {type, title, description, error, dateTime}}) => ({
  ...state,
  messages: [
    {
      type,
      title,
      description,
      error,
      dateTime
    },
    ...state.messages
  ].slice(0, MAX_LOGGED_ERRORS_MESSAGE)
})

const ACTION_HANDLERS = {
  [actions.LOG_ERROR]: logError
}

const initialState = {
  messages: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
