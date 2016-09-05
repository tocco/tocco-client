export const FETCH_VALIDATION_RULES = 'PasswordUpdateDialog/FETCH_VALIDATION_RULES'
export const SET_VALIDATION_RULES = 'PasswordUpdateDialog/SET_VALIDATION_RULES'

export function fetchValidationRules() {
  return {
    type: FETCH_VALIDATION_RULES
  }
}

export function setValidationRules(rules) {
  return {
    type: SET_VALIDATION_RULES,
    payload: {
      rules,
    }
  }
}
