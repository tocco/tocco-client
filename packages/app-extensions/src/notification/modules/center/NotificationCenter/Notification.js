import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import {Typography, Icon} from 'tocco-ui'
import {FormattedRelativeTime} from 'react-intl'
import {selectUnit} from '@formatjs/intl-utils'

import useInViewport from './useInViewport'
import {notificationPropType} from '../../../types'
import NotificationBody from '../../../components/NotificationBody'
import {StyledNotification, StyledNotificationHeader, StyledIconWrapper, StyledTimeStamp} from './StyledComponents'

const typeIconMap = {
  warning: 'exclamation-circle',
  error: 'times-circle',
  success: 'check-circle',
  info: 'info-circle'
}

const Notification = ({notification, markAsRead, navigationStrategy}) => {
  const notificationElement = useRef(null)

  const {value: timeStampValue, unit} = selectUnit(new Date(notification.timestamp))

  const notificationInViewport = () => {
    if (!notification.read) {
      markAsRead(notification.key)
    }
  }
  useInViewport(notificationElement, notificationInViewport)

  return (
    <StyledNotification ref={notificationElement}>
      <StyledNotificationHeader notificationType={notification.type}>
        <StyledIconWrapper>
          <Icon icon={typeIconMap[notification.type]}/>
        </StyledIconWrapper>
        <Typography.H5>{notification.message}</Typography.H5>
      </StyledNotificationHeader>
      <NotificationBody notification={notification} navigationStrategy={navigationStrategy}/>
      <StyledTimeStamp>
        <FormattedRelativeTime value={timeStampValue} unit={unit}/>
      </StyledTimeStamp>
    </StyledNotification>
  )
}

Notification.propTypes = {
  notification: notificationPropType.isRequired,
  markAsRead: PropTypes.func.isRequired,
  navigationStrategy: PropTypes.object
}

export default Notification
