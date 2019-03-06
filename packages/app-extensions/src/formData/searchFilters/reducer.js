import * as actions from './actions'

const setSearchFilter = (state, {payload: {entity, filters}}) => {
  return {...state, [entity]: filters}
}

const ACTION_HANDLERS = {
  [actions.SET_SEARCH_FILTER]: setSearchFilter
}

const initialState = {}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
