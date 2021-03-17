import {takeEvery, all, call, take, put} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'

import {getSocketUrl} from './socket'
import * as actions from './actions'
import errorLogging from '../errorLogging'

export default function* sagas(configs) {
  yield all([
    takeEvery(actions.CONNECT_SOCKET, connectSocket, configs),
    takeEvery(actions.SOCKET_MESSAGE_RECEIVED, messageReceived)
  ])
}

const websocketInitChannel = url =>
  eventChannel(emitter => {
    const ws = new WebSocket(url)

    ws.onopen = e => emitter(actions.wsConnected())
    ws.onmessage = e => {
      console.log(e)
      const data = JSON.parse(e.data)
      emitter(actions.wsMessageReceived(data))
    }
    ws.onclose = e => emitter(actions.connectSocket())
    ws.onerror = err => emitter(errorLogging.logError(err))

    return () => {}
  })

export function* connectSocket(configs) {
  const socketUrl = yield call(getSocketUrl)
  const channel = yield call(websocketInitChannel, socketUrl)

  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

export function* messageReceived({payload: {data}}) {
  console.log('🚀 ~ file: sagas.js ~ line 41 ~ function*messageReceived ~ data', data)
}
