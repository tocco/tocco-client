export const RECEIVE_OPTIONS = 'MergeStrategy/RECEIVE_OPTIONS'
export const CHANGE_OPTION_VALUE = 'MergeStrategy/CHANGE_OPTION_VALUE'
export const ACTIVATE_OPTION = 'MergeStrategy/ACTIVATE_OPTION'

export function retrieveOptions(options) {
  return {
    type: RECEIVE_OPTIONS,
    payload: {
      options
    }
  }
}

export function changeOptionValue(name, value) {
  return {
    type: CHANGE_OPTION_VALUE,
    payload: {
      name,
      value
    }
  }
}

export function activateOption(name, activate) {
  return {
    type: ACTIVATE_OPTION,
    payload: {
      name,
      activate
    }
  }
}

