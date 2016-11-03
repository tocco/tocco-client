export const RECEIVE_EDIT_OPTIONS = 'MergeStrategy/RECEIVE_EDIT_OPTIONS'
export const CHANGE_EDIT_OPTION_VALUE = 'MergeStrategy/CHANGE_EDIT_OPTION_VALUE'
export const ACTIVATE_EDIT_OPTION = 'MergeStrategy/ACTIVATE_EDIT_OPTION'

export const retrieveEditOptions = editOptions => ({
  type: RECEIVE_EDIT_OPTIONS,
  payload: {
    editOptions
  }
})

export const changeEditOptionValue = (name, value) => ({
  type: CHANGE_EDIT_OPTION_VALUE,
  payload: {
    name,
    value
  }
})

export const activateEditOption = (name, activate) => ({
  type: ACTIVATE_EDIT_OPTION,
  payload: {
    name,
    activate
  }
})

