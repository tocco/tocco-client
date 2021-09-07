export const SOCKET_MESSAGE_RECEIVED = 'notification/SOCKET_MESSAGE_RECEIVED'
export const SET_ORIGIN_ID = 'notification/SET_ORIGIN_ID'
export const ADD_IGNORE_TOASTER = 'notification/ADD_IGNORE_TOASTER'

export const socketMessageReceived = data => ({
  type: SOCKET_MESSAGE_RECEIVED,
  payload: {
    data
  }
})

export const setOriginId = originId => ({
  type: SET_ORIGIN_ID,
  payload: {
    originId
  }
})

export const addIgnoreToaster = key => ({
  type: ADD_IGNORE_TOASTER,
  payload: {
    key
  }
})
