export const LOAD_LOCATION_SUGGESTIONS = 'formData/LOAD_LOCATION_SUGGESTIONS'
export const SET_LOCATION_SUGGESTIONS = 'formData/SET_LOCATION_SUGGESTIONS'
export const SET_LOCATION_SUGGESTIONS_LOADING = 'formData/SET_LOCATION_SUGGESTIONS_LOADING'

export const loadLocationsSuggestions = (field, searchInput) => ({
  type: LOAD_LOCATION_SUGGESTIONS,
  payload: {
    field,
    searchInput
  }
})

export const setLocationSuggestions = (field, suggestions, hash) => ({
  type: SET_LOCATION_SUGGESTIONS,
  payload: {
    field,
    suggestions,
    hash
  }
})

export const setLocationSuggestionsLoading = field => ({
  type: SET_LOCATION_SUGGESTIONS_LOADING,
  payload: {
    field
  }
})
