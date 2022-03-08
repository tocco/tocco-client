export const INITIALIZE_INFORMATION = 'inputEditInformation/INITIALIZE_INFORMATION'
export const SET_INFORMATION = 'inputEditInformation/SET_INFORMATION'

export const initializeInformation = () => ({
  type: INITIALIZE_INFORMATION
})

export const setInformation = information => ({
  type: SET_INFORMATION,
  payload: {information}
})
