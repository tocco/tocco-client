export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'

export function updateSearchTerm(searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    searchTerm
  }
}

const ACTION_HANDLERS = {
  [SET_SEARCH_TERM]: (searchTerm, { searchTerm: newSearchTerm }) => newSearchTerm
}

const initialState = ''

export default function searchTermReducer (state: searchTerm = initialState, action: Action): list {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
