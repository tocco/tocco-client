import React from 'react'

export const TOASTER_KEY_PREFIX = 'socket-msg-'
export const getSocketUrl = () => {
  const socketUrl = `${__BACKEND_URL__}`.replace('http://', 'ws://').replace('https://', 'wss://')
  return `${socketUrl}/nice2/websocket/notification`
}

const typeMapping = {
  Information: 'info',
  Fehlgeschlagen: 'error'
}

export const socketMessageToToaster = data => {
  return {
    key: `${TOASTER_KEY_PREFIX}${data.key}`,
    type: typeMapping[data.type] || 'neutral',
    time: data.timestamp,
    title: data.message,
    body: data.taskProgress ? <span>is progress</span> : <span>no progress</span>
  }
}
