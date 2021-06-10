import {takeEvery, all, call, take, put, select} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {originId as originIdHelper, consoleLogger} from 'tocco-util'

import {getSocketUrl, notificationToToaster, TOASTER_KEY_PREFIX} from './socket'
import * as actions from './actions'
import * as toasterActions from '../toaster/actions'
import {toaster} from '../toaster/actions'
import {notificationTransform} from '../../api'
import {updateNotification, updateUnreadNotification} from '../center/actions'

export const notificationSocketSelector = state => state.notification.socket

export default function* sagas(accept) {
  if (accept) {
    yield all([
      takeEvery(actions.SOCKET_MESSAGE_RECEIVED, messageReceived),
      takeEvery(toasterActions.REMOVE_TOASTER, toasterRemoved),
      takeEvery(actions.CONNECT_SOCKET, connectSocket),
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
    ws.onerror = err => {
      consoleLogger.log('socket error', err)
    }

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
  const notification = yield call(notificationTransform, data)
  const {originId, ignoredToasters} = yield select(notificationSocketSelector)
  let showToaster = false

  if (notification.originId === originId) {
    const toasterInfo = yield call(notificationToToaster, notification)
    if (!ignoredToasters.includes(toasterInfo.key) && !notification.read) {
      yield put(toaster(toasterInfo))
      showToaster = true
    }
  }

  if (!showToaster || notification.read) {
    yield put(updateUnreadNotification(notification.key, notification.read))
  }

  yield put(updateNotification(notification))
}

export function* toasterRemoved({payload: {key, manually}}) {
  if (key.startsWith(TOASTER_KEY_PREFIX) && manually) {
    yield put(actions.addIgnoreToaster(key))
  }
}
