export const getSocketUrl = () => {
  const socketUrl = `${__BACKEND_URL__}`.replace('http://', 'ws://').replace('https://', 'wss://')
  return `${socketUrl}/nice2/websocket/notification`
}
