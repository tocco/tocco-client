export const OPEN_ADVANCED_SEARCH = 'formData/OPEN_ADVANCED_SEARCH'
export const ADVANCED_SEARCH_UPDATE = 'formData/ADVANCED_SEARCH_UPDATE'
export const ADVANCED_SEARCH_CLOSE = 'formData/ADVANCED_SEARCH_CLOSE'

export const openAdvancedSearch = (listApp, onSelect, formField, modelField, value) => ({
  type: OPEN_ADVANCED_SEARCH,
  payload: {
    listApp,
    onSelect,
    formField,
    modelField,
    value
  }
})

export const advancedSearchUpdate = ids => ({
  type: ADVANCED_SEARCH_UPDATE,
  payload: {
    ids
  }
})

export const advancedSearchClose = () => ({
  type: ADVANCED_SEARCH_CLOSE
})
