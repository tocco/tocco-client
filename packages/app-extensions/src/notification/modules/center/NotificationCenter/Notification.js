import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {theme, Typography} from 'tocco-ui'
import {FormattedRelative} from 'react-intl'

import useInViewport from './useInViewport'
import {notificationPropType} from '../../../types'
import NotificationBody from '../../../components/NotificationBody'

const StyledNotification = styled.div`
  border: 1px solid #000;
  height: 100px;
  margin: 5px;
  padding-bottom: 10px;
  background-color: ${theme.color('paper')};
`

const Notification = ({notification, markAsRead, navigationStrategy}) => {
  const notificationElement = useRef(null)

  const notificationInViewport = () => {
    if (!notification.read) {
      markAsRead(notification.key)
    }
  }
  useInViewport(notificationElement, notificationInViewport)

  return (
    <StyledNotification ref={notificationElement}>
      <Typography.H1>{notification.message}</Typography.H1>
      <NotificationBody notification={notification} navigationStrategy={navigationStrategy} />
      <div>read: {JSON.stringify(notification.read)}</div>
      <div><FormattedRelative value={notification.timestamp} /></div>
    </StyledNotification>
  )
}

Notification.propTypes = {
  notification: notificationPropType.isRequired,
  markAsRead: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.object
}

export default Notification
