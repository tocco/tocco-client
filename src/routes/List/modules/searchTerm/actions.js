export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'

export function updateSearchTerm(searchTerm) {
  return {
    type: SET_SEARCH_TERM,
    searchTerm
  }
}
