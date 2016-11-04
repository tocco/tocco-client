import {SET_ORDERING} from './actions'
import {INIT_LIST} from '../actions'

const setOrdering = (ordering, {ordering: newOrdering}) => {
  const state = {name: newOrdering}
  if (ordering && newOrdering && newOrdering === ordering.name && ordering.direction === 'asc') {
    state.direction = 'desc'
  } else {
    state.direction = 'asc'
  }
  return state
}

const ACTION_HANDLERS = {
  [SET_ORDERING]: setOrdering,
  [INIT_LIST]: () => initialState
}

const initialState = null

export default function orderingReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}

