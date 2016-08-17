import {SET_SEARCH_TERM} from './actions';

const ACTION_HANDLERS = {
  [SET_SEARCH_TERM]: (searchTerm, { searchTerm: newSearchTerm }) => newSearchTerm
}

const initialState = ''

export default function searchTermReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
