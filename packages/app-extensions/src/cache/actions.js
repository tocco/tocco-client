export const INITIALISE = 'cache/INITIALISE'
export const SET_INITIALISED = 'cache/SET_INITIALISED'

export const initialise = () => ({
  type: INITIALISE
})

export const setInitialised = initialised => ({
  type: SET_INITIALISED,
  payload: {
    initialised
  }
})
