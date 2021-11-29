import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {LoadingSpinner} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import Notification from './Notification'
import {notificationPropType} from '../../../types'
import {
  StyledNotificationCenter,
  StyledNotificationTitleWrapper
} from './StyledComponents'
import {resultTypes} from '../../../api'

const NotificationCenter = (
  {
    loadNotifications,
    notifications,
    moreNotificationsAvailable,
    isLoadingMoreNotifications,
    markAsRead,
    cancelTask,
    navigationStrategy
  }
) => {
  const element = useRef(null)

  useEffect(() => {
    loadNotifications()
  }, [])

  const handleScroll = () => {
    const notificationCount = Object.keys(notifications).length
    const isAtBottom = element.current.scrollTop + element.current.offsetHeight >= element.current.scrollHeight
    const canLoad = !isLoadingMoreNotifications && moreNotificationsAvailable

    if (isAtBottom && canLoad) {
      loadNotifications(notificationCount)
    }
  }

  const SortedNotifications = Object.keys(notifications)
    .map(k => notifications[k])
    .filter(n => !n.result || n.result.type !== resultTypes.outputjob || n.result.file)
    .filter(n => !n.taskProgress || n.taskProgress.status !== 'cancelled')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .map(notification => (
      <Notification
        key={'notification-' + notification.key}
        markAsRead={markAsRead}
        cancelTask={cancelTask}
        notification={notification}
        navigationStrategy={navigationStrategy}
      />
    ))

  return (
    <StyledNotificationCenter ref={element} onScroll={handleScroll}>
      <StyledNotificationTitleWrapper>
        <FormattedMessage id={'client.admin.notification.title'}/>
      </StyledNotificationTitleWrapper>
      {SortedNotifications}
      {isLoadingMoreNotifications && <LoadingSpinner/>}
      {SortedNotifications.length > 0 && !moreNotificationsAvailable
      && <FormattedMessage id={'client.admin.notification.noMoreNotifications'}/>}
      {SortedNotifications.length === 0 && !isLoadingMoreNotifications
      && <FormattedMessage id={'client.admin.notification.noNotification'}/>}
    </StyledNotificationCenter>
  )
}

NotificationCenter.propTypes = {
  loadNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.objectOf(notificationPropType),
  moreNotificationsAvailable: PropTypes.bool,
  isLoadingMoreNotifications: PropTypes.bool,
  markAsRead: PropTypes.func.isRequired,
  cancelTask: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.object
}

export default NotificationCenter
