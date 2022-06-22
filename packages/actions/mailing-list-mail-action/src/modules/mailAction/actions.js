export const LOAD_FORM_DEFINITION = 'mailAction/LOAD_FORM_DEFINITION'
export const SET_FORM_DEFINITION = 'mailAction/SET_FORM_DEFINITION'
export const SEND_MAIL = 'mailAction/SEND_MAIL'
export const VALIDATE = 'mailAction/VALIDATE'
export const SET_FORM_VALID = 'mailAction/SET_FORM_VALID'

export const loadFormDefinition = () => ({
  type: LOAD_FORM_DEFINITION
})

export const setFormDefinition = formDefinition => ({
  type: SET_FORM_DEFINITION,
  payload: {formDefinition}
})

export const sendMail = () => ({
  type: SEND_MAIL
})

export const validate = () => ({
  type: VALIDATE
})

export const setFormValid = formValid => ({
  type: SET_FORM_VALID,
  payload: {formValid}
})
