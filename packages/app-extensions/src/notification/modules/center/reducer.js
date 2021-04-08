import {reducer as reducerUtil} from 'tocco-util'

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

const ACTION_HANDLERS = {
  [actions.SET_NOTIFICATIONS]: setNotifications,
  [actions.SET_MORE_NOTIFICATIONS_AVAILABLE]: reducerUtil.singleTransferReducer('moreNotificationsAvailable'),
  [actions.UPDATE_NOTIFICATION]: updateNotification
}

const initialState = {
  notifications: {},
  moreNotificationsAvailable: true
}

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
