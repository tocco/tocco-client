import * as actions from './actions'
import {enhanceToaster} from './toaster'

const addToaster = (state, {payload: {toaster}}) => {
  const enhancedToaster = enhanceToaster(toaster)
  return {
    ...state,
    toasters: {
      ...state.toasters,
      [enhancedToaster.key]: enhancedToaster
    }
  }
}

const removeToaster = (state, {payload: {key}}) => {
  const {[key]: remove, ...keep} = state.toasters

  return {
    ...state,
    toasters: {
      ...keep
    }
  }
}

const ACTION_HANDLERS = {
  [actions.TOASTER]: addToaster,
  [actions.REMOVE_TOASTER_FROM_STORE]: removeToaster
}

const initialState = {
  toasters: {}
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
