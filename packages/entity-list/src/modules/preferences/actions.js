export const LOAD_PREFERENCES = 'preferences/LOAD_PREFERENCES'
export const SET_POSITIONS = 'preferences/SET_POSITIONS'
export const CHANGE_POSITION = 'preferences/CHANGE_POSITION'

export const loadPreferences = () => ({
  type: LOAD_PREFERENCES
})

export const setPositions = positions => ({
  type: SET_POSITIONS,
  payload: {
    positions
  }
})

export const changePosition = (field, afterFieldPosition, columns) => ({
  type: CHANGE_POSITION,
  payload: {
    field,
    afterFieldPosition,
    columns
  }
})
