export const LOAD_PREFERENCES = 'preferences/LOAD_PREFERENCES'
export const SET_POSITIONS = 'preferences/SET_POSITIONS'
export const CHANGE_POSITION = 'preferences/CHANGE_POSITION'
export const SET_SORTING = 'preferences/SET_SORTING'
export const SET_COLUMNS = 'preferences/SET_COLUMNS'
export const CHANGE_WIDTH = 'preferences/CHANGE_WIDTH'
export const RESET_SORTING = 'preferences/RESET_SORTING'
export const RESET_COLUMNS = 'preferences/RESET_COLUMNS'
export const RESET_PREFERENCES = 'preferences/RESET_PREFERENCES'
export const DISPLAY_COLUMN_MODAL = 'preferences/DISPLAY_COLUMN_MODAL'
export const SET_PREFERENCES_LOADED = 'preferences/SET_PREFERENCES_LOADED'
export const SET_NUMBER_OF_TABLE_ROWS = 'preferences/SET_NUMBER_OF_TABLE_ROWS'
export const DISPLAY_TABLE_ROWS_MODAL = 'preferences/DISPLAY_TABLE_ROWS_MODAL'

export const loadPreferences = () => ({
  type: LOAD_PREFERENCES
})

export const setPreferencesLoaded = preferencesLoaded => ({
  type: SET_PREFERENCES_LOADED,
  payload: {
    preferencesLoaded
  }
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

export const setColumns = columns => ({
  type: SET_COLUMNS,
  payload: {
    columns
  }
})

export const changeWidth = (field, width) => ({
  type: CHANGE_WIDTH,
  payload: {
    field,
    width
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

export const displayColumnModal = () => ({
  type: DISPLAY_COLUMN_MODAL,
  payload: {}
})

export const resetColumns = () => ({
  type: RESET_COLUMNS,
  payload: {}
})

export const displayTableRowsModal = () => ({
  type: DISPLAY_TABLE_ROWS_MODAL
})

export const setNumberOfTableRows = numOfRows => ({
  type: SET_NUMBER_OF_TABLE_ROWS,
  payload: {numOfRows}
})
