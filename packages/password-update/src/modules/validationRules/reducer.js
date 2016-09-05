import * as actions from './actions'

const ACTION_HANDLERS = {
  [actions.SET_VALIDATION_RULES]: (state, action) => action.payload.rules
}

const initialState = []

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
