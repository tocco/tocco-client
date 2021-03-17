export const CONNECT_SOCKET = 'notification/CONNECT_SOCKET'
export const SOCKET_CONNECTED = 'notification/SOCKET_CONNECTED'
export const SOCKET_MESSAGE_RECEIVED = 'notification/SOCKET_MESSAGE_RECEIVED'

export const connectSocket = () => ({
  type: CONNECT_SOCKET
})

export const wsConnected = () => ({
  type: SOCKET_CONNECTED
})

export const wsMessageReceived = data => ({
  type: SOCKET_MESSAGE_RECEIVED,
  payload: {
    data
  }
})
