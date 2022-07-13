import {eventChannel} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'
import {consoleLogger, env} from 'tocco-util'

const WEBSOCKET_SUCCESSFUL_CLOSE_CODE = 1000
const sockets = {}

/**
 * params:
 * - name (string)
 * - originId (string)
 * - messageReceivedAction (action creator)
 */
export function* connectSocket(params) {
  const socketUrl = yield call(getSocketUrl, params.name, params.originId)
  const channel = yield call(websocketInitChannel, {...params, url: socketUrl})

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

export function closeSocket(name) {
  sockets[name].close(WEBSOCKET_SUCCESSFUL_CLOSE_CODE)
}

const websocketInitChannel = params =>
  eventChannel(emitter => {
    const createWebsocketChannel = () => {
      const {url, messageReceivedAction, name} = params

      sockets[name] = new WebSocket(url)

      sockets[name].onmessage = e => {
        const data = JSON.parse(e.data)
        emitter(messageReceivedAction(data))
      }
      sockets[name].onclose = e => {
        if (e.code !== WEBSOCKET_SUCCESSFUL_CLOSE_CODE) {
          createWebsocketChannel()
        }
      }
      sockets[name].onerror = err => {
        consoleLogger.log('socket error', err)
      }
    }

    createWebsocketChannel()

    return () => {}
  })

export const getSocketUrl = (name, originId) => {
  const baseUrl = env.getBackendUrl() || window.location.origin
  const socketUrl = baseUrl.replace('http://', 'ws://').replace('https://', 'wss://')

  // origin ID appended as query param as request headers cannot be supplied when opening a web socket
  return `${socketUrl}/nice2/websocket/${name}?X-Origin-Id=${originId}`
}
