import {takeEvery, all, call, put} from 'redux-saga/effects'

import rest from '../../../rest'
import {notificationTransform} from '../../api'
import * as actions from './actions'

export const notificationsSelector = state => state.notification.center.notifications

const LIMIT = 10

export default function* sagas(accept) {
  if (!accept) {
    yield all([
      call(loadInitialUnreadNotificationKeys),
      takeEvery(actions.LOAD_NOTIFICATIONS, loadNotifications),
      takeEvery(actions.MARK_AS_READ, markAsRead),
      takeEvery(actions.CANCEL_TASK, cancelTask)
    ])
  }
}

export function* loadInitialUnreadNotificationKeys() {
  const limit = 100
  let page = 1
  const keys = []

  do {
    const query = {
      where: 'read == false and relPrincipal.username == :currentUsername',
      limit,
      page
    }

    const result = yield call(rest.fetchEntities, 'Notification', query, {method: 'GET'})
    keys.push(...result.map(e => e.key))

    page++
  } while (keys.length === (page - 1) * limit)

  yield put(actions.setUnreadNotificationKeys(keys))
}

export function* loadNotifications({payload: {offset}}) {
  yield put(actions.isLoadingMoreNotifications())
  const queryParams = {
    _limit: LIMIT,
    _offset: offset
  }
  const notificationsResponse = yield call(rest.requestSaga, 'client/notifications', {method: 'GET', queryParams})
  const notificationList = yield all(notificationsResponse.body.data.map(v => call(notificationTransform, v)))
  const notifications = notificationList.reduce((acc, v) => {
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

export function* cancelTask({payload: {taskExecutionKey}}) {
  yield call(rest.requestSaga, `client/tasks/${taskExecutionKey}`, {
    method: 'DELETE'
  })
}
