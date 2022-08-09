export const SET_INPUT = 'input/SET_INPUT'
export const INPUT_CHANGED = 'input/INPUT_CHANGED'
export const INPUT_INITIALIZED = 'input/INPUT_INITIALIZED'

export const setInput = (key, value) => ({
  type: SET_INPUT,
  payload: {
    [key]: value
  }
})

export const inputInitialized = () => ({
  type: INPUT_INITIALIZED
})

export const inputChanged = (input, prevInput) => ({
  type: INPUT_CHANGED,
  payload: {
    input,
    prevInput
  }
})
