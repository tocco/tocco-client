import {env} from 'tocco-util'

import NotificationBody from '../../components/NotificationBody'
import {resultTypes} from '../../types'

export const TOASTER_KEY_PREFIX = 'socket-msg-'

const isRunning = notification => notification.taskProgress && notification.taskProgress.isRunning
export const hasOutputjobInWidget = notification =>
  env.getEmbedType() === 'widget' && notification.result?.type === resultTypes.outputjob

export const notificationToToaster = notification => {
  return {
    key: `${TOASTER_KEY_PREFIX}${notification.key}`,
    type: notification.type,
    time: new Date(notification.timestamp),
    title: notification.title,
    message: notification.message,
    // eslint-disable-next-line react/prop-types
    body: ({navigationStrategy, cancelTask}) => (
      <NotificationBody notification={notification} navigationStrategy={navigationStrategy} cancelTask={cancelTask} />
    ),
    ...(isRunning(notification) || hasOutputjobInWidget(notification) ? {duration: -1} : {})
  }
}
