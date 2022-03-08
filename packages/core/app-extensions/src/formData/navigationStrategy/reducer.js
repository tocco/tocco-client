import * as actions from './actions'

export const setNavigationStrategy = (state, {payload: {navigationStrategy}}) => {
  return {
    ...state,
    navigationStrategy
  }
}

const ACTION_HANDLERS = {
  [actions.SET_NAVIGATION_STRATEGY]: setNavigationStrategy
}

const initialState = {
  navigationStrategy: null
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
