import {eventChannel} from 'redux-saga'
import {call, put, take} from 'redux-saga/effects'
import {consoleLogger, env} from 'tocco-util'

const WEBSOCKET_SUCCESSFUL_CLOSE_CODE = 1000
const sockets = {}

/**
 * params:
 * - name (string)
 * - messageReceivedAction (action creator)
 */
export function* connectSocket(params) {
  const socketUrl = yield call(getSocketUrl, params.name)
  const channel = yield call(websocketInitChannel, {...params, url: socketUrl})

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

export function* closeSocket(name) {
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

export const getSocketUrl = name => {
  const baseUrl = env.getBackendUrl() || window.location.origin
  const socketUrl = baseUrl.replace('http://', 'ws://').replace('https://', 'wss://')
  return `${socketUrl}/nice2/websocket/${name}`
}
