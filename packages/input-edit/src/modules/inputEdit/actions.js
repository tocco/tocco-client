export const SET_SELECTION = 'inputEdit/SET_SELECTION'
export const CHECK_SELECTION = 'inputEdit/CHECK_SELECTION'
export const SET_VALIDATION = 'inputEdit/SET_VALIDATION'

export const setSelection = selection => ({
  type: SET_SELECTION,
  payload: {selection}
})

export const checkSelection = () => ({
  type: CHECK_SELECTION,
  payload: {}
})

export const setValidation = validation => ({
  type: SET_VALIDATION,
  payload: {validation}
})
