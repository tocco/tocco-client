import React from 'react'

import NotificationBody from '../../components/NotificationBody'

export const TOASTER_KEY_PREFIX = 'socket-msg-'

export const notificationToToaster = notification => {
  return {
    key: `${TOASTER_KEY_PREFIX}${notification.key}`,
    type: notification.type,
    time: new Date(notification.timestamp),
    title: notification.message,
    // eslint-disable-next-line react/prop-types
    body: ({navigationStrategy}) =>
      <NotificationBody notification={notification} navigationStrategy={navigationStrategy}/>,
    ...(notification.taskProgress && notification.taskProgress.isRunning ? {duration: -1} : {})
  }
}
