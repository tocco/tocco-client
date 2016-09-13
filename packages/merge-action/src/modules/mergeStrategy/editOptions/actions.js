export const RECEIVE_EDIT_OPTIONS = 'MergeStrategy/RECEIVE_EDIT_OPTIONS'
export const CHANGE_EDIT_OPTION_VALUE = 'MergeStrategy/CHANGE_EDIT_OPTION_VALUE'
export const ACTIVATE_EDIT_OPTION = 'MergeStrategy/ACTIVATE_EDIT_OPTION'

export function retrieveEditOptions(editOptions) {
  return {
    type: RECEIVE_EDIT_OPTIONS,
    payload: {
      editOptions
    }
  }
}

export function changeEditOptionValue(name, value) {
  return {
    type: CHANGE_EDIT_OPTION_VALUE,
    payload: {
      name,
      value
    }
  }
}

export function activateEditOption(name, activate) {
  return {
    type: ACTIVATE_EDIT_OPTION,
    payload: {
      name,
      activate
    }
  }
}

