import {takeEvery, all, call, put} from 'redux-saga/effects'

import rest from '../../../rest'
import {notificationTransform} from '../../api'
import * as actions from './actions'

const LIMIT = 10

export default function* sagas(accept) {
  if (!accept) {
    yield all([
      takeEvery(actions.LOAD_NOTIFICATIONS, loadNotifications),
      takeEvery(actions.MARK_AS_READ, markAsRead)
    ])
  }
}

export function* loadNotifications({payload: {offset}}) {
  const queryParams = {
    _limit: LIMIT,
    _offset: offset
  }
  const notificationsResponse = yield call(rest.requestSaga, 'client/notifications', {method: 'GET', queryParams})
  const notifications = yield all(notificationsResponse.body.data.map(v => call(notificationTransform, v)))

  notifications.reduce((acc, v) => {
    return {...acc, [v.key]: v}
  }, {})

  if (Object.keys(notifications).length < LIMIT) {
    yield put(actions.setMoreNotificationsAvailable(false))
  }

  yield put(actions.setNotifications(notifications))
}

export function* markAsRead({payload: {notificationKey}}) {
  const options = {
    method: 'PATCH'
  }
  yield call(rest.requestSaga, `client/notifications/${notificationKey}/read`, options)
}
