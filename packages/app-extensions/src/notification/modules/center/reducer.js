import {reducer as reducerUtil} from 'tocco-util'
import _union from 'lodash/union'

import * as actions from './actions'

const setNotifications = (state, {payload: {notifications}}) => ({
  ...state,
  notifications: {
    ...state.notifications,
    ...notifications
  }
})

const updateNotification = (state, {payload: {notification}}) => ({
  ...state,
  notifications: {
    ...state.notifications,
    [notification.key]: notification
  }
})

const updateUnreadNotification = (state, {payload: {notificationKey, read}}) => {
  let unreadNotificationKeys
  if (read) {
    unreadNotificationKeys = state.unreadNotificationKeys.filter(e => e !== notificationKey)
  } else {
    unreadNotificationKeys = _union(state.unreadNotificationKeys, [notificationKey])
  }

  return ({
    ...state,
    unreadNotificationKeys
  })
}

const ACTION_HANDLERS = {
  [actions.SET_NOTIFICATIONS]: setNotifications,
  [actions.SET_MORE_NOTIFICATIONS_AVAILABLE]: reducerUtil.singleTransferReducer('moreNotificationsAvailable'),
  [actions.UPDATE_NOTIFICATION]: updateNotification,
  [actions.SET_UNREAD_NOTIFICATION_KEYS]: reducerUtil.singleTransferReducer('unreadNotificationKeys'),
  [actions.UPDATE_UNREAD_NOTIFICATION]: updateUnreadNotification
}

const initialState = {
  notifications: {},
  unreadNotificationKeys: [],
  moreNotificationsAvailable: true
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
