export const SET_CONFIG = 'keyDown/SET_CONFIG'
export const KEY_DOWN = 'keyDown/KEY_DOWN'

export const setConfig = config => ({
  type: SET_CONFIG,
  payload: {
    config
  }
})

export const keyDown = config => ({
  type: KEY_DOWN,
  payload: {
    config
  }
})
