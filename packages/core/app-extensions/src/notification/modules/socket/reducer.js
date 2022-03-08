import * as actions from './actions'

const addIgnoreToaster = (state, {payload: {key}}) => {
  return {
    ...state,
    ignoredToasters: [...new Set([...state.ignoredToasters, key])]
  }
}

const ACTION_HANDLERS = {
  [actions.ADD_IGNORE_TOASTER]: addIgnoreToaster
}

const initialState = {
  ignoredToasters: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
