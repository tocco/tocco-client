import {takeEvery, all, call, take, put, select} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {originId as originIdHelper} from 'tocco-util'

import {getSocketUrl, socketMessageToToaster, TOASTER_KEY_PREFIX} from './socket'
import * as actions from './actions'
import * as toasterActions from '../toaster/actions'
import errorLogging from '../../../errorLogging'
import {toaster} from '../toaster/actions'
import {updateNotification} from '../center/actions'

export const notificationSocketSelector = state => state.notification.socket

export default function* sagas(accept) {
  if (accept) {
    yield all([
      takeEvery(actions.SOCKET_MESSAGE_RECEIVED, messageReceived),
      takeEvery(toasterActions.REMOVE_TOASTER, toasterRemoved),
      call(connectSocket)
    ])
  }
}

const websocketInitChannel = url =>
  eventChannel(emitter => {
    const ws = new WebSocket(url)

    ws.onopen = e => emitter(actions.socketConnected())
    ws.onmessage = e => {
      const data = JSON.parse(e.data)
      emitter(actions.socketMessageReceived(data))
    }
    ws.onclose = e => emitter(actions.connectSocket())
    ws.onerror = err => emitter(errorLogging.logError(err))

    return () => {}
  })
  
export function* connectSocket() {
  const originId = yield call(originIdHelper.getOriginId)
  yield put(actions.setOriginId(originId))
  const socketUrl = yield call(getSocketUrl)
  const channel = yield call(websocketInitChannel, socketUrl)
  
  while (true) {
    const action = yield take(channel)
    yield put(action)
  }
}

export function* messageReceived({payload: {data}}) {
  const {originId, ignoredToasters} = yield select(notificationSocketSelector)

  if (data.originId === originId) {
    const toasterInfo = yield call(socketMessageToToaster, data)
    if (!ignoredToasters.includes(toasterInfo.key)) {
      yield put(toaster(toasterInfo))
    }
  }

  yield put(updateNotification(data))
}

export function* toasterRemoved({payload: {key, manually}}) {
  if (key.startsWith(TOASTER_KEY_PREFIX) && manually) {
    yield put(actions.addIgnoreToaster(key))
  }
}
