export const INITIALIZE_QUESTION_FORM = 'simpleForm/INITIALIZE_QUESTION_FORM'
export const ADVANCED_SEARCH_UPDATE = 'simpleForm/ADVANCED_SEARCH_UPDATE'

export const SUBMIT = 'simpleForm/SUBMIT'
export const CANCEL = 'simpleForm/CANCEL'

export const initializeForm = () => ({
  type: INITIALIZE_QUESTION_FORM,
  payload: {
  }
})

export const submit = () => ({
  type: SUBMIT
})

export const cancel = () => ({
  type: CANCEL
})

export const advancedSearchUpdate = (field, ids) => ({
  type: ADVANCED_SEARCH_UPDATE,
  payload: {
    field,
    ids
  }
})
