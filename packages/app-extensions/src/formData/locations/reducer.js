import * as actions from './actions'

export const setLocationSuggestions = (state, {payload: {field, suggestions}}) => (
  {
    ...state,
    [field]: {
      suggestions
    }
  }
)

export const setLocationSuggestionsLoading = (state, {payload: {field}}) => (
  {
    ...state,
    [field]: {
      isLoading: true
    }
  }
)

const ACTION_HANDLERS = {
  [actions.SET_LOCATION_SUGGESTIONS]: setLocationSuggestions,
  [actions.SET_LOCATION_SUGGESTIONS_LOADING]: setLocationSuggestionsLoading
}

const initialState = {}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
