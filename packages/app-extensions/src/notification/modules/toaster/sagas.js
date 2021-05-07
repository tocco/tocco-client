import {takeEvery, put, all, select} from 'redux-saga/effects'

import * as actions from './actions'
import actionEmitter from '../../../actionEmitter'
import {notificationsSelector} from '../center/sagas'
import {TOASTER_KEY_PREFIX} from '../socket/socket'
import {markAsRead} from '../center/actions'

export default function* sagas(accept) {
  if (accept) {
    yield all([
      takeEvery(actions.REMOVE_TOASTER, removeToaster)
    ])
  } else {
    yield all([
      takeEvery(actions.TOASTER, emit),
      takeEvery(actions.REMOVE_TOASTER, emit)
    ])
  }
}

export function* emit(action) {
  yield put(actionEmitter.emitAction(action))
}

export function* removeToaster({payload: {key, manually}}) {
  const notifications = yield select(notificationsSelector)
  const notificationKey = key.replace(TOASTER_KEY_PREFIX, '')

  if (notifications[notificationKey].type === 'success' || manually) {
    yield put(markAsRead(notificationKey))
  }
}
