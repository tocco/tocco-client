export const LOAD_FORM_DATA = 'exportAction/LOAD_FORM_DATA'
export const SET_AVAILABLE_COLUMNS = 'exportAction/SET_AVAILABLE_COLUMNS'
export const SET_DEFAULT_VALUES = 'exportAction/SET_DEFAULT_VALUES'
export const RUN_EXPORT = 'exportAction/RUN_EXPORT'

export const loadFormData = selection => ({
  type: LOAD_FORM_DATA,
  payload: {selection}
})

export const setDefaultValues = defaultValues => ({
  type: SET_DEFAULT_VALUES,
  payload: {
    defaultValues
  }
})

export const setAvailableColumns = availableColumns => ({
  type: SET_AVAILABLE_COLUMNS,
  payload: {
    availableColumns
  }
})

export const runExport = columns => ({
  type: RUN_EXPORT,
  payload: {
    columns
  }
})
