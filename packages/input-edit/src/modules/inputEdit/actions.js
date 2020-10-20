export const SET_SELECTION = 'inputEdit/SET_SELECTION'
export const UPDATE_SELECTION = 'inputEdit/UPDATE_SELECTION'
export const SET_HANDLE_NOTIFICATIONS = 'inputEdit/SET_HANDLE_NOTIFICATIONS'

export const setSelection = selection => ({
  type: SET_SELECTION,
  payload: {selection}
})

export const updateSelection = () => ({
  type: UPDATE_SELECTION,
  payload: {}
})

export const setHandleNotifications = handleNotifications => ({
  type: SET_HANDLE_NOTIFICATIONS,
  payload: {
    handleNotifications
  }
})
