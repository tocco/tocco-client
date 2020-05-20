export const INITIALIZE_TABLE = 'inputEditTable/INITIALIZE_TABLE'
export const LOAD_DATA = 'inputEditTable/LOAD_DATA'
export const SET_DATA = 'inputEditTable/SET_DATA'
export const SET_EDIT_FORM = 'inputEditTable/SET_EDIT_FORM'
export const SET_DATA_FORM = 'inputEditTable/SET_DATA_FORM'
export const UPDATE_VALUE = 'inputEditTable/UPDATE_VALUE'
export const SET_VALUE = 'inputEditTable/SET_VALUE'
export const SET_SORTING = 'inputEditTable/SET_SORTING'

export const initializeTable = () => ({
  type: INITIALIZE_TABLE
})

export const loadData = () => ({
  type: LOAD_DATA
})

export const setData = data => ({
  type: SET_DATA,
  payload: data
})

export const setEditForm = form => ({
  type: SET_EDIT_FORM,
  payload: form
})

export const setDataForm = form => ({
  type: SET_DATA_FORM,
  payload: form
})

export const updateValue = (inputDataKey, node, value) => ({
  type: UPDATE_VALUE,
  payload: {
    inputDataKey,
    node,
    value
  }
})

export const setValue = (inputDataKey, node, value) => ({
  type: SET_VALUE,
  payload: {
    inputDataKey,
    node,
    value
  }
})

export const setSorting = (field, direction) => ({
  type: SET_SORTING,
  payload: {
    sorting: {
      field,
      direction
    }
  }
})
