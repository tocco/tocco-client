import {call, put, take} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {consoleLogger} from 'tocco-util'

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
    const {url, messageReceivedAction, name} = params

    sockets[name] = new WebSocket(url)

    sockets[name].onmessage = e => {
      const data = JSON.parse(e.data)
      emitter(messageReceivedAction(data))
    }
    sockets[name].onclose = e => {
      if (e.code !== WEBSOCKET_SUCCESSFUL_CLOSE_CODE) {
        emitter(websocketInitChannel(params))
      }
    }
    sockets[name].onerror = err => {
      consoleLogger.log('socket error', err)
    }

    return () => {}
  })

export const getSocketUrl = name => {
  const baseUrl = __BACKEND_URL__ || window.location.origin
  const socketUrl = baseUrl.replace('http://', 'ws://').replace('https://', 'wss://')
  return `${socketUrl}/nice2/websocket/${name}`
}
