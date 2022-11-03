export const INITIALIZE_INFORMATION = 'inputEditInfo/INITIALIZE_INFORMATION'
export const SET_INFORMATION = 'inputEditInfo/SET_INFORMATION'

export const initializeInformation = () => ({
  type: INITIALIZE_INFORMATION
})

export const setInformation = information => ({
  type: SET_INFORMATION,
  payload: {information}
})
