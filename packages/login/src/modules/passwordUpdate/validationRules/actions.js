export const FETCH_VALIDATION_RULES = 'PasswordUpdateDialog/FETCH_VALIDATION_RULES'
export const SET_VALIDATION_RULES = 'PasswordUpdateDialog/SET_VALIDATION_RULES'

export const fetchValidationRules = () => ({
  type: FETCH_VALIDATION_RULES
})

export const setValidationRules = rules => ({
  type: SET_VALIDATION_RULES,
  payload: {
    rules
  }
})
