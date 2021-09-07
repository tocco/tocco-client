import {call, put, take} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {consoleLogger} from 'tocco-util'

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

const websocketInitChannel = params =>
  eventChannel(emitter => {
    const {url, messageReceivedAction} = params

    const ws = new WebSocket(url)

    ws.onmessage = e => {
      const data = JSON.parse(e.data)
      emitter(messageReceivedAction(data))
    }
    ws.onerror = err => {
      consoleLogger.log('socket error', err)
    }

    return () => {}
  })

export const getSocketUrl = name => {
  const baseUrl = __BACKEND_URL__ || window.location.origin
  const socketUrl = baseUrl.replace('http://', 'ws://').replace('https://', 'wss://')
  return `${socketUrl}/nice2/websocket/${name}`
}
