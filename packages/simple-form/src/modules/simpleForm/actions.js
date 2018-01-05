export const INITIALIZE_QUESTION_FORM = 'simpleForm/INITIALIZE_QUESTION_FORM'

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
