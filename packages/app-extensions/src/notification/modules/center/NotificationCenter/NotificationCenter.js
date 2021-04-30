import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {LoadingSpinner} from 'tocco-ui'

import Notification from './Notification'
import {notificationPropType} from './../../../types'
import {StyledNotificationCenter} from './StyledComponents'

const NotificationCenter = (
  {loadNotifications, notifications, moreNotificationsAvailable, markAsRead, navigationStrategy}
) => {
  const element = useRef(null)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  useEffect(() => {
    loadNotifications()
  }, [])

  useEffect(() => {
    setIsLoadingMore(false)
  }, [notifications])

  const handleScroll = () => {
    if (element.current.scrollTop + element.current.offsetHeight >= element.current.scrollHeight) {
      if (!isLoadingMore && moreNotificationsAvailable) {
        setIsLoadingMore(true)
        loadNotifications(Object.keys(notifications).length)
      }
    }
  }

  const sortedNotifications = Object.keys(notifications)
    .map(k => notifications[k])
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
      {isLoadingMore && <LoadingSpinner />}
      {!moreNotificationsAvailable && <span>This is the end, beautiful friend...</span>}
    </StyledNotificationCenter>
  )
}

NotificationCenter.propTypes = {
  loadNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.objectOf(notificationPropType),
  moreNotificationsAvailable: PropTypes.bool,
  markAsRead: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.object
}

export default NotificationCenter
