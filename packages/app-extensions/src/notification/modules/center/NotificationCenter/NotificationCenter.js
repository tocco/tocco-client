import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {LoadingSpinner} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'

import Notification from './Notification'
import {notificationPropType} from './../../../types'
import {StyledNotificationCenter} from './StyledComponents'
import {resultTypes} from '../../../api'

const NotificationCenter = (
  {
    loadNotifications,
    notifications,
    moreNotificationsAvailable,
    isLoadingMoreNotifications,
    markAsRead,
    navigationStrategy
  }
) => {
  const element = useRef(null)

  useEffect(() => {
    loadNotifications()
  }, [])

  const handleScroll = () => {
    if (element.current.scrollTop + element.current.offsetHeight >= element.current.scrollHeight) {
      if (!isLoadingMoreNotifications && moreNotificationsAvailable) {
        loadNotifications(Object.keys(notifications).length)
      }
    }
  }

  const sortedNotifications = Object.keys(notifications)
    .map(k => notifications[k])
    .filter(n => !n.result || n.result.type !== resultTypes.outputjob || n.result.file)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))

  return (
    <StyledNotificationCenter ref={element} onScroll={handleScroll}>
      {sortedNotifications.map(notification => (
        <Notification
          key={'notification-' + notification.key}
          markAsRead={markAsRead}
          notification={notification}
          navigationStrategy={navigationStrategy}
        />
      ))}
      {isLoadingMoreNotifications && <LoadingSpinner/>}
      {sortedNotifications.length > 0 && !moreNotificationsAvailable
      && <FormattedMessage id={'client.admin.notification.noMoreNotifications'}/>}
      {sortedNotifications.length === 0 && !isLoadingMoreNotifications
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
  navigationStrategy: PropTypes.object
}

export default NotificationCenter
