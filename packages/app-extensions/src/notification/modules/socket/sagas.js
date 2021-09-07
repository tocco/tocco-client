import {takeEvery, all, call, put, select} from 'redux-saga/effects'
import {originId as originIdHelper} from 'tocco-util'

import {notificationToToaster, TOASTER_KEY_PREFIX} from './socket'
import * as actions from './actions'
import * as toasterActions from '../toaster/actions'
import {toaster} from '../toaster/actions'
import {notificationTransform} from '../../api'
import {updateNotification, updateUnreadNotification, markAsRead} from '../center/actions'
import socket from '../../../socket'

export const notificationSocketSelector = state => state.notification.socket
export const toastersSelector = state => state.notification.toaster.toasters

export default function* sagas(accept) {
  if (accept) {
    yield all([
      takeEvery(actions.SOCKET_MESSAGE_RECEIVED, messageReceived),
      takeEvery(toasterActions.REMOVE_TOASTER, toasterRemoved),
      call(initSocket)
    ])
  }
}

export function* initSocket() {
  const originId = yield call(originIdHelper.getOriginId)
  yield put(actions.setOriginId(originId))
  yield call(socket.connectSocket, {
    name: 'notification',
    messageReceivedAction: actions.socketMessageReceived
  })
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
  if (key.startsWith(TOASTER_KEY_PREFIX)) {
    if (manually) {
      yield put(actions.addIgnoreToaster(key))
    }

    const toasters = yield select(toastersSelector)
    if ((toasters[key].type === 'success' || manually)) {
      const notificationKey = key.replace(TOASTER_KEY_PREFIX, '')
      yield put(markAsRead(notificationKey))
    }
  }
}
