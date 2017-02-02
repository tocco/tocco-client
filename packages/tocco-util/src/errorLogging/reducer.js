import * as actions from './actions'

const logError = (state, {payload: {type, title, error, dateTime}}) => ({
  ...state,
  messages: [
    {
      type,
      title,
      error,
      dateTime
    },
    ...state.messages
  ]
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
