export const SET_LIVE_SEARCH = 'SET_LIVE_SEARCH'

export function setLiveSearch(liveSearch) {
  return {
    type: SET_LIVE_SEARCH,
    liveSearch
  }
}

const ACTION_HANDLERS = {
  [SET_LIVE_SEARCH]: (liveSearch, { liveSearch: newLiveSearch }) => newLiveSearch
}

const initialState = true

export default function liveSearchReducer(state: liveSearch = initialState, action: Action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
