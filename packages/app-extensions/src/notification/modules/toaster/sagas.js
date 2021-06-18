import {takeEvery, put, all, select} from 'redux-saga/effects'

import * as actions from './actions'
import actionEmitter from '../../../actionEmitter'
import {TOASTER_KEY_PREFIX} from '../socket/socket'
import {markAsRead} from '../center/actions'

export const toastersSelector = state => state.notification.toaster.toasters

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
  const toasters = yield select(toastersSelector)

  if (toasters[key].type === 'success' || manually) {
    const notificationKey = key.replace(TOASTER_KEY_PREFIX, '')
    yield put(markAsRead(notificationKey))
  }

  yield put(actions.removeToasterFromStore(key))
}
