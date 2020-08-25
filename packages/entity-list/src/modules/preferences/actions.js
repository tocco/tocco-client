export const LOAD_PREFERENCES = 'preferences/LOAD_PREFERENCES'
export const SET_POSITIONS = 'preferences/SET_POSITIONS'
export const CHANGE_POSITION = 'preferences/CHANGE_POSITION'
export const SET_SORTING = 'preferences/SET_SORTING'
export const RESET_SORTING = 'preferences/RESET_SORTING'
export const RESET_PREFERENCES = 'preferences/RESET_PREFERENCES'

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

export const setSorting = sorting => ({
  type: SET_SORTING,
  payload: {
    sorting
  }
})

export const resetSorting = () => ({
  type: RESET_SORTING,
  payload: {}
})

export const resetPreferences = () => ({
  type: RESET_PREFERENCES,
  payload: {}
})
