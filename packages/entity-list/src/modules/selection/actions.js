export const ON_SELECT_CHANGE = 'list/ON_ROW_SELECT'
export const SET_SELECTION = 'list/SET_SELECTION'
export const SET_SELECTION_MODE = 'list/setSelectionMode'
export const CLEAR_SELECTION = 'selection/CLEAR_SELECTION'
export const SET_SHOW_SELECTION_CONTROLLER = 'selection/SET_SHOW_SELECTION_CONTROLLER'
export const SET_TABLE_SELECTION_STYLE = 'selection/SET_TABLE_SELECTION_STYLE'
export const TOGGLE_SHOW_SELECTED_RECORDS = 'selection/TOOGLE_SHOW_SELECTED_RECORDS'
export const RELOAD_DATA = 'selection/RELOAD_DATA'

export const setSelectionMode = selectionMode => ({
  type: SET_SELECTION_MODE,
  payload: {
    selectionMode
  }
})

export const setSelection = selection => ({
  type: SET_SELECTION,
  payload: {
    selection
  }
})

export const onSelectChange = (keys, isSelected) => ({
  type: ON_SELECT_CHANGE,
  payload: {
    keys,
    isSelected
  }
})

export const clearSelection = () => ({
  type: CLEAR_SELECTION
})

export const setShowSelectionController = showSelectionController => ({
  type: SET_SHOW_SELECTION_CONTROLLER,
  payload: {
    showSelectionController
  }
})

export const setTableSelectionStyle = tableSelectionStyle => ({
  type: SET_TABLE_SELECTION_STYLE,
  payload: {
    tableSelectionStyle
  }
})

export const toggleShowSelectedRecords = () => ({
  type: TOGGLE_SHOW_SELECTED_RECORDS
})

export const reloadData = () => ({
  type: RELOAD_DATA
})
