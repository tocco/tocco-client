export const INITIALIZE_QUESTION_FORM = 'simpleForm/INITIALIZE_QUESTION_FORM'
export const ADVANCED_SEARCH_UPDATE = 'simpleForm/ADVANCED_SEARCH_UPDATE'
export const SET_FIELD_DEFINITIONS = 'simpleForm/SET_FIELD_DEFINITIONS'

export const SUBMIT = 'simpleForm/SUBMIT'
export const CANCEL = 'simpleForm/CANCEL'

export const initializeForm = () => ({
  type: INITIALIZE_QUESTION_FORM,
  payload: {}
})

export const submit = () => ({
  type: SUBMIT
})

export const cancel = () => ({
  type: CANCEL
})

export const setFieldDefinitions = fieldDefinitions => ({
  type: SET_FIELD_DEFINITIONS,
  payload: {
    fieldDefinitions
  }
})
