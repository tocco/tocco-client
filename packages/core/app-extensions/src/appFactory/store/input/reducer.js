import * as actions from './actions'

const setInput = (state, {payload}) => {
  return {
    ...state,
    ...payload
  }
}

const ACTION_HANDLERS = {
  [actions.SET_INPUT]: setInput
}

const initialState = {}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
