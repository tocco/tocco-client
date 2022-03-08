import * as actions from './actions'

const addBlocker = (state, {payload: {id, title, body}}) => ({
  ...state,
  blockers: [...state.blockers, {id, title, body}]
})

const removeBlocker = (state, {payload: {id}}) => ({
  ...state,
  blockers: state.blockers.filter(e => e.id !== id)
})

const ACTION_HANDLERS = {
  [actions.BLOCKING_INFO]: addBlocker,
  [actions.REMOVE_BLOCKING_INFO]: removeBlocker
}

const initialState = {
  blockers: []
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
