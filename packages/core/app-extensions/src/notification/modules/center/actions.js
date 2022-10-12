export const SET_UNREAD_NOTIFICATION_KEYS = 'notification/SET_UNREAD_NOTIFICATION_KEYS'
export const UPDATE_UNREAD_NOTIFICATION = 'notification/UPDATE_UNREAD_NOTIFICATION'
export const LOAD_NOTIFICATIONS = 'notification/LOAD_NOTIFICATIONS'
export const SET_NOTIFICATIONS = 'notification/SET_NOTIFICATION'
export const SET_MORE_NOTIFICATIONS_AVAILABLE = 'notification/SET_MORE_NOTIFICATIONS_AVAILABLE'
export const UPDATE_NOTIFICATION = 'notification/UPDATE_NOTIFICATION'
export const IS_LOADING_MORE_NOTIFICATIONS = 'notification/IS_LOADING_MORE_NOTIFICATIONS'
export const MARK_AS_READ = 'notification/MARK_AS_READ'
export const CANCEL_TASK = 'notification/CANCEL_TASK'

export const setUnreadNotificationKeys = unreadNotificationKeys => ({
  type: SET_UNREAD_NOTIFICATION_KEYS,
  payload: {
    unreadNotificationKeys
  }
})

export const updateUnreadNotification = (notificationKey, read) => ({
  type: UPDATE_UNREAD_NOTIFICATION,
  payload: {
    notificationKey,
    read
  }
})

export const loadNotifications = (offset = 0) => ({
  type: LOAD_NOTIFICATIONS,
  payload: {
    offset
  }
})

export const setNotifications = notifications => ({
  type: SET_NOTIFICATIONS,
  payload: {
    notifications
  }
})

export const setMoreNotificationsAvailable = moreNotificationsAvailable => ({
  type: SET_MORE_NOTIFICATIONS_AVAILABLE,
  payload: {
    moreNotificationsAvailable
  }
})

export const updateNotification = notification => ({
  type: UPDATE_NOTIFICATION,
  payload: {
    notification
  }
})

export const isLoadingMoreNotifications = (isLoading = true) => ({
  type: IS_LOADING_MORE_NOTIFICATIONS,
  payload: {
    isLoadingMoreNotifications: isLoading
  }
})

export const markAsRead = notificationKey => ({
  type: MARK_AS_READ,
  payload: {
    notificationKey
  }
})

export const cancelTask = taskExecutionKey => ({
  type: CANCEL_TASK,
  payload: {
    taskExecutionKey
  }
})
