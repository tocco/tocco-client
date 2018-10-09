import * as actions from './actions'

const setUsername = (state, {payload}) => {
  const {username} = payload
  return {
    ...state,
    username
  }
}

const ACTION_HANDLERS = {
  [actions.SET_USERNAME]: setUsername
}

const initialState = {
  username: ''
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
